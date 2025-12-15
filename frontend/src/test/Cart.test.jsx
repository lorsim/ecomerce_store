import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Cart from "../components/Cart";

test("shows empty cart message", () => {
  render(<Cart cart={{ items: [], subtotal: 0 }} loading={false} error="" />);
  expect(screen.getByText("Cart is empty")).toBeInTheDocument();
});
