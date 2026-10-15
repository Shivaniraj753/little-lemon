import { Link, useLocation } from "react-router-dom";

export default function ConfirmedBooking() {
  const { state } = useLocation();

  // Edge case: someone opens /confirmed directly with no booking in memory.
  if (!state) {
    return (
      <section className="content">
        <h1>No booking found</h1>
        <p>You haven't made a reservation yet.</p>
        <Link to="/booking" className="btn">Reserve a table</Link>
      </section>
    );
  }

  return (
    <section className="content" aria-labelledby="confirmed-title">
      <h1 id="confirmed-title">Booking confirmed</h1>
      <p role="status">
        Your table for {state.guests} {state.guests === 1 ? "guest" : "guests"} is booked
        on {state.date} at {state.time} ({state.occasion}).
      </p>
      <Link to="/" className="btn">Back to home</Link>
    </section>
  );
}
