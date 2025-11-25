export function userIsRideMember(ride, userId) {
  if (!ride || !userId) return false;

  const ownerId = ride.ownerId ?? ride.owner?.id;
  if (ownerId === userId) return true;

  const passengers = Array.isArray(ride.passengers) ? ride.passengers : [];

  return passengers.some(
    (p) => p.userId === userId && p.status === "accepted"
  );
}