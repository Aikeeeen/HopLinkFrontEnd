import initSqlJs from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";

const DB_KEY = "hoplink_sqljs_v1";

let SQL;
let db;

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
  `);
}

function _persist() {
  const data = db.export();
  localStorage.setItem(DB_KEY, _bytesToB64(data));
}

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

export async function createUser({ email, name, role, password }) {
  const db = await getDB();
  const exists = db.exec(`SELECT 1 FROM users WHERE email = $email`, {
    $email: email.trim().toLowerCase(),
  });
  if (exists.length) throw new Error("Email already registered");

  db.run(
    `INSERT INTO users (email, name, role, password) VALUES ($email, $name, $role, $password)`,
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
    `SELECT id, email, name, role FROM users WHERE email = $email AND password = $password`,
    { $email: email.trim().toLowerCase(), $password: password }
  );
  if (!res.length || !res[0].values.length) throw new Error("Invalid credentials");
  return _rowToUser(res[0].values[0]);
}

function _rowToUser(row) {
  const [id, email, name, role] = row;
  return { id, email, name, role };
}
