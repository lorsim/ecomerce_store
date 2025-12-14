const genCode = () => {
  return "SAVE10-" + Math.random().toString(16).slice(2, 6).toUpperCase();
};

export async function validateDiscount(store, code) {
  const active = store.discount.active;
  if (!active) throw new Error("No active discount available");
  if (active.isUsed) throw new Error("Discount code already used");
  if (active.code !== code) throw new Error("Invalid discount code");

  return active;
}

export async function generateDiscount(subtotal) {
  return Math.floor((subtotal * 10) / 100);
}

export async function markDiscountAsUsed(store, orderId, amount) {
  const active = store.discount.active;
  active.isUsed = true;
  active.usedByOrderId = orderId;
  active.discountAmount = amount;
  store.discount.totalDiscountAmount += amount;

  return active;
}

export async function onOrderPlaced(store) {
  store.discount.orderCount += 1;

  const nth = store.nth;
  const { orderCount, active } = store.discount;

  if (orderCount % nth !== 0)
    return { generated: false, reason: "Not nth order" };
  if (active && !active.isUsed)
    return {
      generated: false,
      reason: "Unused active discount code already exists",
    };

  const code = genCode();
  const entry = { code, isUsed: false };

  store.discount.active = entry;
  store.discount.history.push(entry);

  return { generated: true, reason: "Nth order reached", code };
}

export async function generateIfEligible(store) {
  const { orderCount, active } = store.discount;
  const nth = store.nth;

  if (orderCount === 0)
    return { generated: false, reason: "No orders placed yet" };
  if (orderCount % nth !== 0)
    return { generated: false, reason: "Not nth order" };
  if (active && !active.isUsed)
    return {
      generated: false,
      reason: "Unused active discount code already exists",
    };

  const code = genCode();
  const entry = { code, isUsed: false };

  store.discount.active = entry;
  store.discount.history.push(entry);

  return {
    generated: true,
    reason: "Eligible and generated new discount code",
    code,
  };
}
