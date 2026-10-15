import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

test("home page links to the reservation page", () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "Little Lemon", level: 1 })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /reserve a table/i })).toHaveAttribute("href", "/booking");
});

test("confirmation page explains when there is no booking", () => {
  render(<MemoryRouter initialEntries={["/confirmed"]}><App /></MemoryRouter>);
  expect(screen.getByText(/no booking found/i)).toBeInTheDocument();
});

test("booking page renders the reservation form", () => {
  render(<MemoryRouter initialEntries={["/booking"]}><App /></MemoryRouter>);
  expect(screen.getByRole("form", { name: /table reservation form/i })).toBeInTheDocument();
});
