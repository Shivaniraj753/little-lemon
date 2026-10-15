import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from "../components/BookingForm";
import { formatDate } from "../utils/api";

const future = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return formatDate(d);
};

function setup(props = {}) {
  const dispatch = jest.fn();
  const submitForm = jest.fn().mockReturnValue(true);
  render(<BookingForm availableTimes={["17:00", "18:00"]} dispatch={dispatch} submitForm={submitForm} {...props} />);
  return { dispatch, submitForm };
}

beforeEach(() => localStorage.clear());

test("renders all fields and a disabled submit button", () => {
  setup();
  ["Choose date", "Choose time", "Number of guests", "Occasion"].forEach((l) =>
    expect(screen.getByLabelText(l)).toBeInTheDocument()
  );
  expect(screen.getByRole("button", { name: /make your reservation/i })).toBeDisabled();
});

test("shows an error when guests is out of range", async () => {
  setup();
  const guests = screen.getByLabelText("Number of guests");
  await userEvent.clear(guests);
  await userEvent.type(guests, "20");
  await userEvent.tab();
  expect(screen.getByText(/from 1 to 10/i)).toBeInTheDocument();
  expect(guests).toHaveAttribute("aria-invalid", "true");
});

test("shows a message when a date has no free times", async () => {
  setup({ availableTimes: [] });
  await userEvent.type(screen.getByLabelText("Choose date"), future());
  expect(screen.getByText(/no tables are free/i)).toBeInTheDocument();
});

test("dispatches UPDATE_TIMES when the date changes", async () => {
  const { dispatch } = setup();
  await userEvent.type(screen.getByLabelText("Choose date"), future());
  expect(dispatch).toHaveBeenCalledWith({ type: "UPDATE_TIMES", date: future() });
});

test("submits valid data to submitForm", async () => {
  const { submitForm } = setup();
  await userEvent.type(screen.getByLabelText("Choose date"), future());
  await userEvent.selectOptions(screen.getByLabelText("Choose time"), "18:00");
  await userEvent.selectOptions(screen.getByLabelText("Occasion"), "Birthday");
  const button = screen.getByRole("button", { name: /make your reservation/i });
  expect(button).toBeEnabled();
  await userEvent.click(button);
  expect(submitForm).toHaveBeenCalledWith({ date: future(), time: "18:00", guests: 1, occasion: "Birthday" });
});

test("shows an error message when saving fails", async () => {
  setup({ submitForm: jest.fn().mockReturnValue(false) });
  await userEvent.type(screen.getByLabelText("Choose date"), future());
  await userEvent.selectOptions(screen.getByLabelText("Choose time"), "17:00");
  await userEvent.selectOptions(screen.getByLabelText("Occasion"), "Other");
  await userEvent.click(screen.getByRole("button", { name: /make your reservation/i }));
  expect(screen.getByText(/couldn't save your booking/i)).toBeInTheDocument();
});
