import { useState } from "react";
import { checkout } from "../api";

export default function CheckoutPage() {
  const [userId, setUserId] = useState("u1");
  const [discountCode, setDiscountCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setError("");
    setResult(null);

    try {
      const data = await checkout({ userId, discountCode: discountCode.trim() || undefined });
      setResult(data);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <h3>Checkout</h3>

      <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          placeholder="Discount Code (optional)"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />

        <button onClick={handleCheckout}>Checkout</button>
      </div>

     {error && (
        <div style={{ color: "#ff6b6b", marginTop: 10 }}>
            {error}
        </div>
     )}


      {result && (
  <div style={{ marginTop: 16 }}>
    <h4>Order Result</h4>

    <pre
      style={{
        background: "#111",
        color: "#eee",
        padding: 12,
        borderRadius: 8,
        overflowX: "auto",
        border: "1px solid #333",
      }}
    >
      {JSON.stringify(result, null, 2)}
    </pre>

    {result.generateNewDiscount?.generated && (
      <div
        style={{
          marginTop: 12,
          padding: 10,
          border: "1px dashed #555",
          borderRadius: 8,
          background: "#0f172a",
        }}
      >
        <div style={{ marginBottom: 6 }}>
           <b>New Discount Code Generated</b>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <code
            style={{
              padding: "6px 10px",
              background: "#020617",
              borderRadius: 6,
              fontSize: 14,
            }}
          >
            {result.generateNewDiscount.code}
          </code>

          <button
            onClick={() =>
              navigator.clipboard.writeText(result.generateNewDiscount.code)
            }
          >
            Copy
          </button>
        </div>
      </div>
    )}
  </div>
)}

    </>
  );
}
