import { checkout } from "../../services/checkout.service.js";

export async function placeOrder(req, res) {
  try {
    const store = req.app.locals.store;
    const { userId, discountCode } = req.body || {};

    const result = await checkout(store, {
      userId: String(userId || ""),
      discountCode: discountCode ? String(discountCode) : undefined,
    });

    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
