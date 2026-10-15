# Little Lemon - Table Booking App

A React front-end for the fictional Little Lemon restaurant. Visitors can browse the home, about and menu pages and reserve a table through an accessible, validated booking form.

## Features
- Pages: Home, About, Menu, Reservations, Booking confirmation (React Router)
- Booking form with date, time, guests (1-10) and occasion
  - Available times update when the date changes (`useReducer`)
  - Validation with clear messages: required fields, no past dates, guest limits
  - Edge cases: dates with no free times, failed saves, visiting `/confirmed` with no booking, slots already booked are hidden
- Accessibility: semantic landmarks, skip link, labelled fields, `aria-invalid`/`aria-describedby`, `role="alert"` errors, visible focus
- Responsive layout down to mobile widths
- Unit tests with Jest and React Testing Library

## Getting started
Requires Node.js 18+ and npm.

    git clone <your-repo-url>
    cd little-lemon
    npm install
    npm start        # http://localhost:3000
    npm test         # run unit tests (press "a" to run all)
    npm run build    # production build

## Project structure
    src/
      components/   Header, Footer, BookingForm
      pages/        Home, About, Menu, BookingPage, ConfirmedBooking
      utils/        api.js (mock booking API), validation.js
      __tests__/    unit tests

## Notes
- The booking "API" is a local mock in `src/utils/api.js`. Bookings are saved in `localStorage`, so they stay in your browser only.
- Time slots for each date are generated deterministically so the same date always shows the same slots.
