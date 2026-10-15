import { initializeTimes, updateTimes } from "../pages/BookingPage";
import { fetchAPI } from "../utils/api";

test("initializeTimes returns today's available times", () => {
  expect(initializeTimes()).toEqual(fetchAPI(new Date()));
});

test("updateTimes returns the times for the chosen date", () => {
  const result = updateTimes([], { type: "UPDATE_TIMES", date: "2030-06-15" });
  expect(result).toEqual(fetchAPI(new Date(2030, 5, 15)));
});

test("updateTimes returns the same state for an unknown action", () => {
  const state = ["17:00"];
  expect(updateTimes(state, { type: "OTHER" })).toBe(state);
});
