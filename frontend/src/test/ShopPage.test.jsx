import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import ShopPage from "../pages/ShopPage";

vi.mock("../api", () => ({
  getCart: vi.fn(async () => ({
    userId: "John Doe",
    items: [],
    subtotal: 0,
  })),
}));

test("renders product list", () => {
  render(<ShopPage />);
  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.getByText("Banana")).toBeInTheDocument();
  expect(screen.getByText("Milk")).toBeInTheDocument();
  expect(screen.getByText(/cart/i)).toBeInTheDocument();
});
