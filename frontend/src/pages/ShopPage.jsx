import { useEffect, useState } from "react";
import { getCart } from "../api";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

export default function ShopPage() {
  const [userId, setUserId] = useState("u1");
  const cleanUserId = userId.trim();

  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");

  async function refreshCart() {
    if (!cleanUserId) return;
    setCartLoading(true);
    setCartError("");
    try {
      const data = await getCart(cleanUserId);
      setCart(data);
    } catch (e) {
      setCartError(e.message);
      setCart(null);
    } finally {
      setCartLoading(false);
    }
  }

  // load cart when userId changes
  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanUserId]);

  return (
    <>
      <h3>Shop</h3>

      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 8 }}>User ID:</label>
        <input value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>

      <ProductList userId={cleanUserId} onAdded={refreshCart} />

      <div style={{ height: 16 }} />

      <Cart cart={cart} loading={cartLoading} error={cartError} />
    </>
  );
}
