import { todayString } from "./api";

export const MAX_GUESTS = 10;
export const OCCASIONS = ["Birthday", "Anniversary", "Engagement", "Other"];

/** Returns an object of error messages keyed by field name (empty object = valid). */
export function validateBooking({ date, time, guests, occasion }) {
  const errors = {};

  if (!date) errors.date = "Choose a date for your reservation.";
  else if (date < todayString()) errors.date = "Choose today or a future date.";

  if (!time) errors.time = "Choose one of the available times.";

  const count = Number(guests);
  if (guests === "" || guests === null || Number.isNaN(count)) {
    errors.guests = "Enter the number of guests.";
  } else if (!Number.isInteger(count) || count < 1 || count > MAX_GUESTS) {
    errors.guests = `Guests must be a whole number from 1 to ${MAX_GUESTS}.`;
  }

  if (!occasion) errors.occasion = "Choose an occasion.";
  return errors;
}
