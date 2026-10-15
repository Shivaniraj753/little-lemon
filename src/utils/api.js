/**
 * Mock booking API.
 * - fetchAPI(date) returns the available time slots for a Date.
 * - submitAPI(data) "saves" a booking (in localStorage) and returns true/false.
 * Slots already booked for a date are removed from that date's availability.
 */
const STORAGE_KEY = "little-lemon-bookings";
const ALL_SLOTS = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

/** Formats a Date as YYYY-MM-DD in local time (what <input type="date"> uses). */
export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const todayString = () => formatDate(new Date());

/** Small deterministic pseudo-random generator so a date always gives the same slots. */
function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function readBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function fetchAPI(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return [];
  const random = seededRandom(date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate());
  const booked = readBookings()[formatDate(date)] || [];
  return ALL_SLOTS.filter(() => random() > 0.3).filter((slot) => !booked.includes(slot));
}

export function submitAPI(formData) {
  try {
    const bookings = readBookings();
    bookings[formData.date] = [...(bookings[formData.date] || []), formData.time];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return true;
  } catch {
    return false;
  }
}
