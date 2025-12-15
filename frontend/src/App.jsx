import { useState } from "react";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [page, setPage] = useState("shop");

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: "0 auto" }}>
      <h2 style={{ marginTop: 0 }}>E-Commerce Store</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setPage("shop")}>Shop</button>
        <button onClick={() => setPage("checkout")}>Checkout</button>
        <button onClick={() => setPage("admin")}>Admin</button>
      </div>

      <hr />

      {page === "shop" && <ShopPage />}
      {page === "checkout" && <CheckoutPage />}
      {page === "admin" && <AdminPage />}
    </div>
  );
}
