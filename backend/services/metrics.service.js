export async function getMetrics(store) {
  let itemsPurchasedCount = 0;
  let totalPurchasedAmount = 0;

  for (const order of store.orders) {
    totalPurchasedAmount += order.total;
    for (const item of order.items) {
      itemsPurchasedCount += item.quantity;
    }
  }

  return {
    totalOrders: store.orders.length,
    itemsPurchasedCount,
    totalPurchasedAmount,
    discountCodes: store.discount.history.length,
    totalDiscountAmount: store.discount.totalDiscountAmount,
  };
}
