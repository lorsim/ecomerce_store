import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import AdminPage from "../pages/AdminPage";

vi.mock("../api", () => ({
  getMetrics: vi.fn(async () => ({
    totalOrders: 0,
    itemsPurchasedCount: 0,
    totalPurchasedAmount: 0,
    discountCodes: 0,
    totalDiscountAmount: 0,
  })),
}));

test("renders admin page title", async () => {
  render(<AdminPage />);
  expect(await screen.findByText("Admin")).toBeInTheDocument();
});
