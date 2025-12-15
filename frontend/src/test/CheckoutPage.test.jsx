import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import CheckoutPage from "../pages/CheckoutPage";

test("renders checkout form", () => {
  render(<CheckoutPage />);

  expect(
    screen.getByRole("heading", { name: "Checkout" })
  ).toBeInTheDocument();

  expect(screen.getByPlaceholderText("User ID")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("Discount Code (optional)")
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: "Checkout" })
  ).toBeInTheDocument();
});
