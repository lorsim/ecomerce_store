export default function Metrics({ data }) {
  return (
    <div style={{ marginTop: 12, border: "1px solid #ddd", borderRadius: 8, padding: 10 }}>
      <div><b>Total Orders:</b> {data.totalOrders}</div>
      <div><b>Items Purchased:</b> {data.itemsPurchasedCount}</div>
      <div><b>Total Purchased Amount:</b> ₹{data.totalPurchasedAmount}</div>
      <div><b>Discount Codes Generated:</b> {data.discountCodes}</div>
      <div><b>Total Discount Amount:</b> ₹{data.totalDiscountAmount}</div>
    </div>
  );
}
