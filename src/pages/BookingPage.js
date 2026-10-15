import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { fetchAPI, submitAPI } from "../utils/api";

/** Initial state: the times available today. */
export function initializeTimes() {
  return fetchAPI(new Date());
}

/** Reducer: when the date changes, load the times available on that date. */
export function updateTimes(state, action) {
  if (action.type === "UPDATE_TIMES") {
    return fetchAPI(new Date(`${action.date}T00:00:00`));
  }
  return state;
}

export default function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
  const navigate = useNavigate();

  const submitForm = (formData) => {
    const saved = submitAPI(formData);
    if (saved) navigate("/confirmed", { state: formData });
    return saved;
  };

  return (
    <section className="content" aria-labelledby="booking-title">
      <h1 id="booking-title">Reserve a table</h1>
      <p>Choose a date to see the times we have available.</p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
    </section>
  );
}
