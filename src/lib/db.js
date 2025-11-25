// src/lib/db.js
import initSqlJs from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";

const DB_KEY = "hoplink_sqljs_v1";

let SQL;
let db;

/* ============ Boot ============ */
export async function getDB() {
  if (db) return db;
  if (!SQL) SQL = await initSqlJs({ locateFile: () => wasmUrl });

  const saved = localStorage.getItem(DB_KEY);
  db = new SQL.Database(saved ? _b64ToBytes(saved) : undefined);
  _ensureSchema();
  return db;
}

function _ensureSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      role TEXT CHECK(role IN ('driver','passenger')) NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS rides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER NOT NULL,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      date TEXT NOT NULL,
      depart_time TEXT,
      arrive_time TEXT,
      seats INTEGER NOT NULL,
      trip_type TEXT CHECK(trip_type IN ('single','return')) NOT NULL,
      km INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(owner_id) REFERENCES users(id)
    );

    /* requests table (passengers requesting to join a ride)
       status: 'pending' | 'accepted' */
    CREATE TABLE IF NOT EXISTS ride_passengers (
      ride_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      status TEXT CHECK(status IN ('pending','accepted')) NOT NULL DEFAULT 'pending',
      PRIMARY KEY (ride_id, user_id),
      FOREIGN KEY(ride_id) REFERENCES rides(id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

        /* Group chat per ride */
    CREATE TABLE IF NOT EXISTS ride_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ride_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(ride_id) REFERENCES rides(id),
      FOREIGN KEY(sender_id) REFERENCES users(id)
    );

    /* Per-ride read markers so we can show unread counts in Inbox */
    CREATE TABLE IF NOT EXISTS ride_message_reads (
      ride_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      last_read_at TEXT NOT NULL,
      PRIMARY KEY (ride_id, user_id),
      FOREIGN KEY(ride_id) REFERENCES rides(id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  // Lightweight migration: add status column if missing
  try {
    const info = db.exec(`PRAGMA table_info(ride_passengers);`);
    const hasStatus =
      info.length &&
      info[0].values.some((row) => String(row[1]).toLowerCase() === "status");
    if (!hasStatus) {
      db.exec(`ALTER TABLE ride_passengers ADD COLUMN status TEXT DEFAULT 'pending';`);
    }
  } catch (e) {
    // ignore PRAGMA issues on older sql.js
    void e;
  }
}

// ---- pub/sub so UI can auto-refresh badges
function _emitChanged() {
  if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
    window.dispatchEvent(new Event("db:changed"));
  }
}

function _persist() {
  const data = db.export();
  localStorage.setItem(DB_KEY, _bytesToB64(data));
  _emitChanged();
}

export function subscribeToDB(cb) {
  const handler = () => cb?.();
  window.addEventListener("db:changed", handler);
  return () => window.removeEventListener("db:changed", handler);
}

/* helpers */
function _b64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function _bytesToB64(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function _userIsRideMember(db, rideId, userId) {
  if (!rideId || !userId) return false;

  // Owner?
  const owner = db.exec(
    `SELECT 1 FROM rides WHERE id=$id AND owner_id=$uid`,
    { $id: rideId, $uid: userId }
  );
  if (owner.length) return true;

  // Accepted passenger?
  const passenger = db.exec(
    `SELECT 1 FROM ride_passengers WHERE ride_id=$id AND user_id=$uid AND status='accepted'`,
    { $id: rideId, $uid: userId }
  );

  return passenger.length > 0;
}

/* ============ Users ============ */
export async function createUser({ email, name, role, password }) {
  const db = await getDB();
  const exists = db.exec(
    `SELECT 1 FROM users WHERE email = $email`,
    { $email: email.trim().toLowerCase() }
  );
  if (exists.length) throw new Error("Email already registered");

  db.run(
    `INSERT INTO users (email, name, role, password)
     VALUES ($email, $name, $role, $password)`,
    {
      $email: email.trim().toLowerCase(),
      $name: name?.trim() ?? "",
      $role: role,
      $password: password,
    }
  );
  _persist();

  const res = db.exec(
    `SELECT id, email, name, role FROM users WHERE email = $email`,
    { $email: email.trim().toLowerCase() }
  );
  return res[0]?.values?.[0] && _rowToUser(res[0].values[0]);
}

export async function loginUser({ email, password }) {
  const db = await getDB();
  const res = db.exec(
    `SELECT id, email, name, role
     FROM users
     WHERE email = $email AND password = $password`,
    { $email: email.trim().toLowerCase(), $password: password }
  );
  if (!res.length || !res[0].values.length) throw new Error("Invalid credentials");
  return _rowToUser(res[0].values[0]);
}

function _rowToUser(row) {
  const [id, email, name, role] = row;
  return { id, email, name, role };
}

/* ============ Owner CRUD ============ */
export async function createRideRow({
  ownerId, origin, destination, date, departTime, arriveTime, seats, tripType, km
}) {
  const db = await getDB();
  db.run(
    `INSERT INTO rides (owner_id, origin, destination, date, depart_time, arrive_time, seats, trip_type, km)
     VALUES ($owner_id, $origin, $destination, $date, $depart, $arrive, $seats, $trip_type, $km)`,
    {
      $owner_id: ownerId,
      $origin: origin,
      $destination: destination,
      $date: date,
      $depart: departTime || "",
      $arrive: arriveTime || "",
      $seats: Number(seats),
      $trip_type: tripType,
      $km: km ?? null
    }
  );
  _persist();

  const res = db.exec(
    `SELECT id, owner_id, origin, destination, date, depart_time, arrive_time, seats, trip_type, km, created_at
     FROM rides
     WHERE owner_id = $owner_id
     ORDER BY id DESC LIMIT 1`,
    { $owner_id: ownerId }
  );
  return res[0]?.values?.[0] && _rowToRide(res[0].values[0]);
}

export async function updateRideRow(rideId, ownerId, fields) {
  const db = await getDB();
  db.run(
    `UPDATE rides
     SET origin = $origin,
         destination = $destination,
         date = $date,
         depart_time = $depart,
         arrive_time = $arrive,
         seats = $seats,
         trip_type = $trip_type,
         km = $km
     WHERE id = $id AND owner_id = $owner`,
    {
      $id: rideId,
      $owner: ownerId,
      $origin: fields.origin,
      $destination: fields.destination,
      $date: fields.date,
      $depart: fields.departTime || "",
      $arrive: fields.arriveTime || "",
      $seats: Number(fields.seats),
      $trip_type: fields.tripType,
      $km: fields.km ?? null,
    }
  );
  _persist();

  const res = db.exec(
    `SELECT id, owner_id, origin, destination, date, depart_time, arrive_time, seats, trip_type, km, created_at
     FROM rides WHERE id = $id AND owner_id = $owner`,
    { $id: rideId, $owner: ownerId }
  );
  return res[0]?.values?.[0] && _rowToRide(res[0].values[0]);
}

export async function listRidesByOwner(ownerId) {
  const db = await getDB();
  const res = db.exec(
    `SELECT id, owner_id, origin, destination, date, depart_time, arrive_time, seats, trip_type, km, created_at
     FROM rides
     WHERE owner_id = $owner_id
     ORDER BY created_at DESC`,
    { $owner_id: ownerId }
  );
  return _rowsToRides(res);
}

export async function deleteRide(rideId, ownerId) {
  const db = await getDB();
  db.run(`DELETE FROM ride_passengers WHERE ride_id = $id`, { $id: rideId });
  db.run(`DELETE FROM rides WHERE id = $id AND owner_id = $owner`, { $id: rideId, $owner: ownerId });
  _persist();
}

function _rowsToRides(res) {
  if (!res.length) return [];
  const rows = res[0].values;
  return rows.map(_rowToRide);
}
function _rowToRide(row) {
  const [id, owner_id, origin, destination, date, depart_time, arrive_time, seats, trip_type, km, created_at] = row;
  return {
    id,
    ownerId: owner_id,
    origin,
    destination,
    date,
    departTime: depart_time,
    arriveTime: arrive_time,
    seats,
    tripType: trip_type,
    km,
    createdAt: created_at
  };
}

/* ============ Browse / Requests ============ */

/** listAllRidesForBrowse: includes joinedStatus + remaining seats (accepted only) */
export async function listAllRidesForBrowse(filters = {}, currentUserId = null) {
  const db = await getDB();

  const conds = [];
  const params = { $me: currentUserId ?? -1 };

  if (filters.origin) { conds.push(`r.origin = $origin`); params.$origin = filters.origin; }
  if (filters.destination) { conds.push(`r.destination = $destination`); params.$destination = filters.destination; }
  if (filters.date) { conds.push(`r.date = $date`); params.$date = filters.date; }
  if (filters.originPrefix) { conds.push(`r.origin LIKE $originPrefix`); params.$originPrefix = `${filters.originPrefix}%`; }
  if (filters.destinationPrefix) { conds.push(`r.destination LIKE $destinationPrefix`); params.$destinationPrefix = `${filters.destinationPrefix}%`; }

  const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";
  const inner = `
    SELECT
      r.id, r.owner_id, r.origin, r.destination, r.date,
      r.depart_time, r.arrive_time, r.seats, r.trip_type, r.km, r.created_at,
      u.name AS owner_name,
      -- only accepted passengers reduce remaining
      (r.seats - COALESCE((SELECT COUNT(*) FROM ride_passengers p WHERE p.ride_id = r.id AND p.status='accepted'), 0)) AS remaining,
      -- current user's join status (NULL | 'pending' | 'accepted')
      (SELECT p3.status FROM ride_passengers p3 WHERE p3.ride_id = r.id AND p3.user_id = $me LIMIT 1) AS join_status
    FROM rides r
    JOIN users u ON u.id = r.owner_id
    ${where}
    ORDER BY r.date ASC, r.depart_time ASC
  `;

  const outerConds = [];
  if (!filters.showFull) outerConds.push(`remaining > 0`);
  if (filters.minSeats) outerConds.push(`remaining >= $minSeats`);
  if (filters.excludeOwner && currentUserId) outerConds.push(`owner_id <> $me`);
  const outerWhere = outerConds.length ? `WHERE ${outerConds.join(" AND ")}` : "";

  const sql = `SELECT * FROM (${inner}) ${outerWhere};`;
  if (filters.minSeats) params.$minSeats = Number(filters.minSeats);

  const res = db.exec(sql, params);
  return _rowsToBrowse(res);
}

function _rowsToBrowse(res) {
  if (!res.length) return [];
  const rows = res[0].values;
  const cols = res[0].columns;
  return rows.map((row) => {
    const obj = {};
    cols.forEach((c, i) => (obj[c] = row[i]));
    return {
      id: obj.id,
      ownerId: obj.owner_id,
      ownerName: obj.owner_name,
      origin: obj.origin,
      destination: obj.destination,
      date: obj.date,
      departTime: obj.depart_time,
      arriveTime: obj.arrive_time,
      seats: obj.seats,
      tripType: obj.trip_type,
      km: obj.km,
      createdAt: obj.created_at,
      remaining: obj.remaining,
      joinedStatus: obj.join_status || null, // 'pending' | 'accepted' | null
    };
  });
}

/** Passenger requests to join: creates/updates to 'pending' */
export async function joinRide(rideId, userId) {
  const db = await getDB();

  // cannot join your own ride
  const own = db.exec(
    `SELECT 1 FROM rides WHERE id=$id AND owner_id=$uid`,
    { $id: rideId, $uid: userId }
  );
  if (own.length) throw new Error("You cannot join your own ride.");

  // upsert to pending
  const existing = db.exec(
    `SELECT status FROM ride_passengers WHERE ride_id=$id AND user_id=$uid`,
    { $id: rideId, $uid: userId }
  );
  if (!existing.length) {
    db.run(
      `INSERT INTO ride_passengers (ride_id, user_id, status) VALUES ($id, $uid, 'pending')`,
      { $id: rideId, $uid: userId }
    );
  } else {
    db.run(
      `UPDATE ride_passengers SET status='pending' WHERE ride_id=$id AND user_id=$uid`,
      { $id: rideId, $uid: userId }
    );
  }
  _persist();
}

/** Passenger withdraws (or leaves after acceptance) */
export async function leaveRide(rideId, userId) {
  const db = await getDB();
  db.run(
    `DELETE FROM ride_passengers WHERE ride_id=$id AND user_id=$uid`,
    { $id: rideId, $uid: userId }
  );
  _persist();
}

/** Count pending requests for badge */
export async function countPendingRequests(driverId) {
  const db = await getDB();
  const res = db.exec(
    `SELECT COUNT(*)
     FROM ride_passengers p
     JOIN rides r ON r.id = p.ride_id
     WHERE r.owner_id = $owner AND p.status='pending'`,
    { $owner: driverId }
  );
  if (!res.length || !res[0].values.length) return 0;
  return Number(res[0].values[0][0]) || 0;
}

/** Driver: flat pending requests (elsewhere if needed) */
export async function listPendingRequestsForDriver(driverId) {
  const db = await getDB();
  const res = db.exec(
    `
    SELECT p.ride_id, p.user_id, p.status, r.origin, r.destination, r.date, r.depart_time,
           u.name AS user_name, u.email AS user_email
    FROM ride_passengers p
    JOIN rides r ON r.id = p.ride_id
    JOIN users u ON u.id = p.user_id
    WHERE r.owner_id = $owner AND p.status = 'pending'
    ORDER BY r.date ASC, r.depart_time ASC
    `,
    { $owner: driverId }
  );
  if (!res.length) return [];
  const rows = res[0].values;
  return rows.map((row) => {
    const [ride_id, user_id, status, origin, destination, date, depart_time, user_name, user_email] = row;
    return { rideId: ride_id, userId: user_id, status, origin, destination, date, departTime: depart_time, userName: user_name, userEmail: user_email };
  });
}

/** Driver: grouped requests (show ALL rides with counts) */
export async function listRequestsGroupedForDriver(driverId) {
  const db = await getDB();

  // All rides
  const ridesRes = db.exec(
    `SELECT id, origin, destination, date, depart_time, seats
     FROM rides
     WHERE owner_id = $owner
     ORDER BY date ASC, depart_time ASC`,
    { $owner: driverId }
  );
  if (!ridesRes.length) return [];

  const headers = ridesRes[0].values.map(([id, origin, destination, date, depart_time, seats]) => ({
    rideId: id,
    origin,
    destination,
    date,
    departTime: depart_time,
    title: `${origin} → ${destination}`,
    seats,
    remaining: 0,
    pending: [],
    accepted: [],
    pendingCount: 0,
    acceptedCount: 0,
  }));

  const byId = new Map(headers.map((r) => [r.rideId, r]));

  // remaining seats (accepted only)
  const remRes = db.exec(
    `SELECT r.id,
            r.seats - COALESCE((SELECT COUNT(*) FROM ride_passengers p WHERE p.ride_id=r.id AND p.status='accepted'),0) AS remaining
     FROM rides r
     WHERE r.owner_id = $owner`,
    { $owner: driverId }
  );
  if (remRes.length) {
    for (const [id, rem] of remRes[0].values) {
      const g = byId.get(id);
      if (g) g.remaining = Number(rem) || 0;
    }
  }

  // pending
  const pendingRes = db.exec(
    `SELECT p.ride_id, p.user_id, u.name, u.email
     FROM ride_passengers p
     JOIN users u ON u.id = p.user_id
     JOIN rides r ON r.id = p.ride_id
     WHERE r.owner_id = $owner AND p.status='pending'
     ORDER BY u.name ASC`,
    { $owner: driverId }
  );
  if (pendingRes.length) {
    for (const [rideId, userId, name, email] of pendingRes[0].values) {
      const g = byId.get(rideId);
      if (g) {
        g.pending.push({ userId, name, email });
        g.pendingCount++;
      }
    }
  }

  // accepted
  const acceptedRes = db.exec(
    `SELECT p.ride_id, p.user_id, u.name, u.email
     FROM ride_passengers p
     JOIN users u ON u.id = p.user_id
     JOIN rides r ON r.id = p.ride_id
     WHERE r.owner_id = $owner AND p.status='accepted'
     ORDER BY u.name ASC`,
    { $owner: driverId }
  );
  if (acceptedRes.length) {
    for (const [rideId, userId, name, email] of acceptedRes[0].values) {
      const g = byId.get(rideId);
      if (g) {
        g.accepted.push({ userId, name, email });
        g.acceptedCount++;
      }
    }
  }

  return headers; // include rides even if no requests
}

/** Driver: accept a pending request */
export async function acceptRideRequest(rideId, userId, driverId) {
  const db = await getDB();
  const own = db.exec(`SELECT 1 FROM rides WHERE id=$id AND owner_id=$owner`, { $id: rideId, $owner: driverId });
  if (!own.length) throw new Error("Not your ride.");

  const seatRes = db.exec(
    `SELECT seats - COALESCE((SELECT COUNT(*) FROM ride_passengers WHERE ride_id=$id AND status='accepted'),0) AS remaining
     FROM rides WHERE id=$id`,
    { $id: rideId }
  );
  const remaining = seatRes.length ? seatRes[0].values[0][0] : 0;
  if (remaining <= 0) throw new Error("No seats available.");

  db.run(
    `UPDATE ride_passengers SET status='accepted' WHERE ride_id=$id AND user_id=$uid`,
    { $id: rideId, $uid: userId }
  );
  _persist();
}

/** Driver: decline a pending request */
export async function declineRideRequest(rideId, userId, driverId) {
  const db = await getDB();
  const own = db.exec(`SELECT 1 FROM rides WHERE id=$id AND owner_id=$owner`, { $id: rideId, $owner: driverId });
  if (!own.length) throw new Error("Not your ride.");

  db.run(
    `DELETE FROM ride_passengers WHERE ride_id=$id AND user_id=$uid`,
    { $id: rideId, $uid: userId }
  );
  _persist();
}

/** Driver: remove an accepted passenger (free seat) */
export async function removeAcceptedPassenger(rideId, passengerId, driverId) {
  const db = await getDB();
  const own = db.exec(`SELECT 1 FROM rides WHERE id=$r AND owner_id=$d`, { $r: rideId, $d: driverId });
  if (!own.length) throw new Error("Not authorized for this ride.");

  db.run(
    `DELETE FROM ride_passengers WHERE ride_id=$r AND user_id=$u AND status='accepted'`,
    { $r: rideId, $u: passengerId }
  );
  _persist();
}

export async function listJoinedRidesForUser(userId) {
  const db = await getDB();

  const res = db.exec(
    `
    SELECT
      r.id,
      r.owner_id,
      r.origin,
      r.destination,
      r.date,
      r.depart_time,
      r.arrive_time,
      r.seats,
      r.trip_type,
      r.km,
      r.created_at,
      u.name AS owner_name,
      (
        r.seats
        - COALESCE(
            (SELECT COUNT(*)
             FROM ride_passengers p2
             WHERE p2.ride_id = r.id AND p2.status = 'accepted'),
            0
          )
      ) AS remaining
    FROM ride_passengers p
    JOIN rides r ON r.id = p.ride_id
    JOIN users u ON u.id = r.owner_id
    WHERE p.user_id = $uid AND p.status = 'accepted'
    ORDER BY r.date ASC, r.depart_time ASC
    `,
    { $uid: userId }
  );

  if (!res.length) return [];

  const rows = res[0].values;
  return rows.map(
    ([
      id,
      owner_id,
      origin,
      destination,
      date,
      depart_time,
      arrive_time,
      seats,
      trip_type,
      km,
      created_at,
      owner_name,
      remaining,
    ]) => ({
      id,
      ownerId: owner_id,
      ownerName: owner_name,
      origin,
      destination,
      date,
      departTime: depart_time,
      arriveTime: arrive_time,
      seats,
      tripType: trip_type,
      km,
      createdAt: created_at,
      remaining,
      joinedStatus: "accepted", // convenient for cards
    })
  );
}


/* ============ Ride detail + chat / inbox ============ */

/** Full ride detail including driver + passengers */
export async function getRideWithParticipants(rideId) {
  const db = await getDB();

  const rideRes = db.exec(
    `SELECT
        r.id, r.owner_id, r.origin, r.destination, r.date,
        r.depart_time, r.arrive_time, r.seats, r.trip_type, r.km, r.created_at,
        u.name, u.email, u.role
     FROM rides r
     JOIN users u ON u.id = r.owner_id
     WHERE r.id = $id`,
    { $id: rideId }
  );

  if (!rideRes.length || !rideRes[0].values.length) return null;
  const row = rideRes[0].values[0];
  const [
    id,
    owner_id,
    origin,
    destination,
    date,
    depart_time,
    arrive_time,
    seats,
    trip_type,
    km,
    created_at,
    owner_name,
    owner_email,
    owner_role,
  ] = row;

  const passengersRes = db.exec(
    `SELECT p.user_id, p.status, u.name, u.email
     FROM ride_passengers p
     JOIN users u ON u.id = p.user_id
     WHERE p.ride_id = $id
     ORDER BY u.name ASC`,
    { $id: rideId }
  );

  const passengers = passengersRes.length
    ? passengersRes[0].values.map(
        ([user_id, status, name, email]) => ({
          userId: user_id,
          status,
          name,
          email,
        })
      )
    : [];

  return {
    id,
    owner: {
      id: owner_id,
      name: owner_name,
      email: owner_email,
      role: owner_role,
    },
    origin,
    destination,
    date,
    departTime: depart_time,
    arriveTime: arrive_time,
    seats,
    tripType: trip_type,
    km,
    createdAt: created_at,
    passengers,
  };
}

/** Post a message into a ride's group chat */
export async function postRideMessage(rideId, senderId, body) {
  const trimmed = String(body || "").trim();
  if (!trimmed) return null;

  const db = await getDB();

  // Hard check: only owner or accepted passengers can post
  if (!_userIsRideMember(db, rideId, senderId)) {
    return null; // or throw new Error("Not allowed");
  }

  db.run(
    `INSERT INTO ride_messages (ride_id, sender_id, body)
     VALUES ($ride_id, $sender_id, $body)`,
    {
      $ride_id: rideId,
      $sender_id: senderId,
      $body: trimmed,
    }
  );
  _persist();

  const res = db.exec(
    `SELECT m.id, m.ride_id, m.sender_id, m.body, m.created_at,
            u.name, u.email
     FROM ride_messages m
     JOIN users u ON u.id = m.sender_id
     WHERE m.ride_id = $ride_id
     ORDER BY m.created_at DESC, m.id DESC
     LIMIT 1`,
    { $ride_id: rideId }
  );

  if (!res.length || !res[0].values.length) return null;
  const [id, rId, sId, msgBody, createdAt, name, email] = res[0].values[0];
  return {
    id,
    rideId: rId,
    senderId: sId,
    senderName: name,
    senderEmail: email,
    body: msgBody,
    createdAt,
  };
}

/** List all messages for a ride (oldest first) */
export async function listRideMessages(rideId) {
  const db = await getDB();
  const res = db.exec(
    `SELECT m.id, m.ride_id, m.sender_id, m.body, m.created_at,
            u.name, u.email
     FROM ride_messages m
     JOIN users u ON u.id = m.sender_id
     WHERE m.ride_id = $ride_id
     ORDER BY m.created_at ASC, m.id ASC`,
    { $ride_id: rideId }
  );

  if (!res.length) return [];
  return res[0].values.map(
    ([id, rId, sId, body, createdAt, name, email]) => ({
      id,
      rideId: rId,
      senderId: sId,
      senderName: name,
      senderEmail: email,
      body,
      createdAt,
    })
  );
}

/** Mark all messages in this ride as read for the given user */
export async function markRideMessagesRead(rideId, userId) {
  const db = await getDB();
  const existing = db.exec(
    `SELECT last_read_at
     FROM ride_message_reads
     WHERE ride_id = $ride AND user_id = $user`,
    { $ride: rideId, $user: userId }
  );

  if (!existing.length || !existing[0].values.length) {
    db.run(
      `INSERT INTO ride_message_reads (ride_id, user_id, last_read_at)
       VALUES ($ride, $user, datetime('now'))`,
      { $ride: rideId, $user: userId }
    );
  } else {
    db.run(
      `UPDATE ride_message_reads
       SET last_read_at = datetime('now')
       WHERE ride_id = $ride AND user_id = $user`,
      { $ride: rideId, $user: userId }
    );
  }
  _persist();
}

/** Total unread chat messages across all rides the user is part of */
export async function countUnreadMessages(userId) {
  const db = await getDB();

  const res = db.exec(
    `
    SELECT COUNT(*)
    FROM ride_messages m
    JOIN rides r ON r.id = m.ride_id
    WHERE
      -- user is driver OR accepted passenger
      (
        r.owner_id = $uid
        OR EXISTS (
          SELECT 1 FROM ride_passengers p
          WHERE p.ride_id = r.id
            AND p.user_id = $uid
            AND p.status = 'accepted'
        )
      )
      -- don't count your own messages
      AND m.sender_id <> $uid
      -- and only those after your last_read_at for that ride
      AND (
        NOT EXISTS (
          SELECT 1 FROM ride_message_reads rr
          WHERE rr.ride_id = m.ride_id AND rr.user_id = $uid
        )
        OR m.created_at > (
          SELECT rr.last_read_at
          FROM ride_message_reads rr
          WHERE rr.ride_id = m.ride_id AND rr.user_id = $uid
        )
      )
    `,
    { $uid: userId }
  );

  if (!res.length || !res[0].values.length) return 0;
  return Number(res[0].values[0][0]) || 0;
}

/** Threads for Inbox: one per ride that has messages for this user */
export async function listInboxThreadsForUser(userId) {
  const db = await getDB();

  // Rides where user is driver or accepted passenger
  const ridesRes = db.exec(
    `
    SELECT DISTINCT r.id, r.origin, r.destination, r.date, r.depart_time
    FROM rides r
    LEFT JOIN ride_passengers p ON p.ride_id = r.id
    WHERE r.owner_id = $uid
       OR (p.user_id = $uid AND p.status = 'accepted')
    ORDER BY r.date ASC, r.depart_time ASC
    `,
    { $uid: userId }
  );

  if (!ridesRes.length) return [];

  const threads = [];

  for (const [rideId, origin, destination, date, depart_time] of ridesRes[0]
    .values) {
    // last message (if any)
    const lastRes = db.exec(
      `
      SELECT m.id, m.body, m.created_at, u.name, u.email, m.sender_id
      FROM ride_messages m
      JOIN users u ON u.id = m.sender_id
      WHERE m.ride_id = $ride
      ORDER BY m.created_at DESC, m.id DESC
      LIMIT 1
      `,
      { $ride: rideId }
    );

    let lastMessage = null;

    if (lastRes.length && lastRes[0].values.length) {
      const [
        lastId,
        lastBody,
        lastCreatedAt,
        lastName,
        lastEmail,
        lastSenderId,
      ] = lastRes[0].values[0];

      lastMessage = {
        id: lastId,
        body: lastBody,
        createdAt: lastCreatedAt,
        senderId: lastSenderId,
        senderName: lastName,
        senderEmail: lastEmail,
      };
    }

    // unread count (only if there are messages)
    let unread = 0;
    if (lastMessage) {
      const unreadRes = db.exec(
        `
        SELECT COUNT(*)
        FROM ride_messages m
        WHERE m.ride_id = $ride
          AND m.sender_id <> $uid
          AND (
            NOT EXISTS (
              SELECT 1 FROM ride_message_reads rr
              WHERE rr.ride_id = m.ride_id AND rr.user_id = $uid
            )
            OR m.created_at > (
              SELECT rr.last_read_at
              FROM ride_message_reads rr
              WHERE rr.ride_id = m.ride_id AND rr.user_id = $uid
            )
          )
        `,
        { $ride: rideId, $uid: userId }
      );

      unread =
        unreadRes.length && unreadRes[0].values.length
          ? Number(unreadRes[0].values[0][0]) || 0
          : 0;
    }

    threads.push({
      rideId,
      origin,
      destination,
      date,
      departTime: depart_time,
      lastMessage,
      unread,
    });
  }

  // Newest activity first:
  // - rides with messages sorted by lastMessage.createdAt
  // - rides with no messages fall back to date / departTime
  threads.sort((a, b) => {
    const aHasMsg = !!a.lastMessage;
    const bHasMsg = !!b.lastMessage;

    if (aHasMsg && bHasMsg) {
      return a.lastMessage.createdAt < b.lastMessage.createdAt ? 1 : -1;
    }
    if (aHasMsg && !bHasMsg) return -1;
    if (!aHasMsg && bHasMsg) return 1;

    // neither has messages -> sort by date + time
    const aKey = `${a.date || ""} ${a.departTime || ""}`;
    const bKey = `${b.date || ""} ${b.departTime || ""}`;
    return aKey < bKey ? -1 : 1;
  });

  return threads;
}


