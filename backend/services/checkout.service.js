import { getCart, clearCart } from "./cart.service.js";
import {
  validateDiscount,
  generateDiscount,
  markDiscountAsUsed,
  onOrderPlaced,
} from "./discount.service.js";

export async function checkout(store, { userId, discountCode }) {
  if (!userId) {
    throw new Error("User ID is required for checkout");
  }

  const cart = await getCart(store, userId);
  if (cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let discountAmount = 0;
  if (discountCode) {
    await validateDiscount(store, discountCode);
    discountAmount = await generateDiscount(cart.subtotal);
  }

  const total = cart.subtotal - discountAmount;
  const orderId = `ord_${store.orders.length + 1}`;

  store.orders.push({
    id: orderId,
    userId,
    items: cart.items,
    subtotal: cart.subtotal,
    discountCodeApplied: discountCode || null,
    discountAmount,
    total,
  });

  if (discountCode) {
    await markDiscountAsUsed(store, orderId, discountAmount);
  }

  await clearCart(store, userId);
  const generateNewDiscount = await onOrderPlaced(store);
  return {
    orderId,
    subtotal: cart.subtotal,
    discountAmount,
    total,
    generateNewDiscount,
  };
}
