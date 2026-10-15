import { fetchAPI, submitAPI, formatDate } from "../utils/api";

beforeEach(() => localStorage.clear());

test("fetchAPI returns an array of HH:MM time strings", () => {
  const times = fetchAPI(new Date(2030, 5, 15));
  expect(Array.isArray(times)).toBe(true);
  times.forEach((t) => expect(t).toMatch(/^\d{2}:\d{2}$/));
});

test("fetchAPI gives the same slots for the same date", () => {
  expect(fetchAPI(new Date(2030, 5, 15))).toEqual(fetchAPI(new Date(2030, 5, 15)));
});

test("fetchAPI returns an empty list for an invalid date", () => {
  expect(fetchAPI(new Date("not a date"))).toEqual([]);
});

test("a booked slot is removed from that date's availability", () => {
  const date = new Date(2030, 5, 15);
  const [first] = fetchAPI(date);
  expect(submitAPI({ date: formatDate(date), time: first })).toBe(true);
  expect(fetchAPI(date)).not.toContain(first);
});
