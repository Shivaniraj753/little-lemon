import { useState } from "react";
import { todayString } from "../utils/api";
import { MAX_GUESTS, OCCASIONS, validateBooking } from "../utils/validation";

const INITIAL = { date: "", time: "", guests: "1", occasion: "" };

/**
 * Table booking form.
 * Props:
 *  - availableTimes: array of "HH:MM" strings for the chosen date
 *  - dispatch: reducer dispatch used to refresh availableTimes when the date changes
 *  - submitForm: function(values) -> boolean (true when the booking was saved)
 */
export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [values, setValues] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");

  const errors = validateBooking(values);
  const isValid = Object.keys(errors).length === 0;
  const noTimes = values.date && !errors.date && availableTimes.length === 0;
  const showError = (field) => touched[field] && errors[field];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitError("");
    if (name === "date") {
      // New date means new availability, so clear any previously chosen time.
      setValues({ ...values, date: value, time: "" });
      if (value && value >= todayString()) dispatch({ type: "UPDATE_TIMES", date: value });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ date: true, time: true, guests: true, occasion: true });
    if (!isValid) return;
    const saved = submitForm({ ...values, guests: Number(values.guests) });
    if (!saved) setSubmitError("We couldn't save your booking. Please try again.");
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-label="Table reservation form">
      <div className="field">
        <label htmlFor="date">Choose date</label>
        <input
          id="date" name="date" type="date" min={todayString()} required
          value={values.date} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!showError("date")} aria-describedby="date-error"
        />
        <p id="date-error" className="error" role="alert">{showError("date") || ""}</p>
      </div>

      <div className="field">
        <label htmlFor="time">Choose time</label>
        <select
          id="time" name="time" required value={values.time}
          onChange={handleChange} onBlur={handleBlur}
          disabled={!values.date || noTimes}
          aria-invalid={!!showError("time")} aria-describedby="time-error"
        >
          <option value="">Select a time</option>
          {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <p id="time-error" className="error" role="alert">
          {noTimes ? "No tables are free on this date. Please choose another date." : showError("time") || ""}
        </p>
      </div>

      <div className="field">
        <label htmlFor="guests">Number of guests</label>
        <input
          id="guests" name="guests" type="number" min="1" max={MAX_GUESTS} required
          value={values.guests} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!showError("guests")} aria-describedby="guests-error"
        />
        <p id="guests-error" className="error" role="alert">{showError("guests") || ""}</p>
      </div>

      <div className="field">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion" name="occasion" required value={values.occasion}
          onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!showError("occasion")} aria-describedby="occasion-error"
        >
          <option value="">Select an occasion</option>
          {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <p id="occasion-error" className="error" role="alert">{showError("occasion") || ""}</p>
      </div>

      {submitError && <p className="error submit-error" role="alert">{submitError}</p>}

      <button type="submit" className="btn" disabled={!isValid} aria-label="Make your reservation">
        Make your reservation
      </button>
    </form>
  );
}
