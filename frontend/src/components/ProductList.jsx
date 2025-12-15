import { useState } from "react";
import { addToCart } from "../api";

const PRODUCTS = [
  { id: "apple", label: "Apple", price: 50 },
  { id: "banana", label: "Banana", price: 30 },
  { id: "milk", label: "Milk", price: 70 },
];

export default function ProductList({ userId, onAdded }) {
  const [status, setStatus] = useState("");

  async function handleAdd(itemId) {
    if (!userId) {
      setStatus("User ID required");
      return;
    }

    setStatus("Adding...");
    try {
      await addToCart({ userId, itemId, quantity: 1 });
      setStatus(`Added ${itemId}`);
      if (onAdded) await onAdded(); 
    } catch (e) {
      setStatus(e.message);
    } finally {
      setTimeout(() => setStatus(""), 800);
    }
  }

  return (
    <>
      <h4>Products</h4>

      <div style={{ display: "grid", gap: 8 }}>
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{p.label}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>₹{p.price}</div>
            </div>

            <button onClick={() => handleAdd(p.id)}>Add</button>
          </div>
        ))}
      </div>

      {status && <div style={{ marginTop: 10, fontSize: 12 }}>{status}</div>}
    </>
  );
}
