import { useState } from "react";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [page, setPage] = useState("shop");

  return (
     <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        background: "#1f1f1f",
        color: "#e5e5e5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          padding: 20,
        }}
      >
      <h2 style={{ marginTop: 0 }}>E-Commerce Store</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setPage("shop")}>Shop</button>
        <button onClick={() => setPage("checkout")}>Checkout</button>
        <button onClick={() => setPage("admin")}>Admin</button>
      </div>

      <hr style={{ opacity: 0.3 }} />

      {page === "shop" && <ShopPage />}
      {page === "checkout" && <CheckoutPage />}
      {page === "admin" && <AdminPage />}
     </div>
    </div>
  );
}
