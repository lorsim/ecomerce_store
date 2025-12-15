export default function Cart({ cart, loading, error }) {
  if (!cart && loading) return <div>Loading cart…</div>;
  if (error) return <div style={{ color: "crimson" }}>{error}</div>;
  if (!cart || cart.items.length === 0) return <div>Cart is empty</div>;

  return (
    <>
      <h4>Cart</h4>
      {loading && <div style={{ fontSize: 12, opacity: 0.7 }}>Refreshing…</div>}

      <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10 }}>
        {cart.items.map((i) => (
          <div key={i.itemId} style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{i.itemId} × {i.quantity}</div>
            <div>₹{i.subtotal}</div>
          </div>
        ))}
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
          <div>Subtotal</div>
          <div>₹{cart.subtotal}</div>
        </div>
      </div>
    </>
  );
}
