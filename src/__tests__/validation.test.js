import { validateBooking } from "../utils/validation";
import { formatDate } from "../utils/api";

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return formatDate(d);
};
const valid = { date: tomorrow(), time: "18:00", guests: "4", occasion: "Birthday" };

test("accepts a complete, valid booking", () => {
  expect(validateBooking(valid)).toEqual({});
});

test("rejects a date in the past", () => {
  expect(validateBooking({ ...valid, date: "2000-01-01" }).date).toMatch(/future/i);
});

test.each(["0", "11", "2.5", ""])("rejects invalid guest count %p", (guests) => {
  expect(validateBooking({ ...valid, guests }).guests).toBeDefined();
});

test("requires date, time and occasion", () => {
  const errors = validateBooking({ date: "", time: "", guests: "2", occasion: "" });
  expect(Object.keys(errors).sort()).toEqual(["date", "occasion", "time"]);
});
