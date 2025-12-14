import * as cartService from "../../services/cart.service.js";

export async function getCart(req, res) {
  try {
    const store = req.app.locals.store;
    const userId = String(req.query.userId || "");
    const cart = await cartService.getCart(store, userId);
    res.json(cart);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function addItem(req, res) {
  try {
    const store = req.app.locals.store;
    const { userId, itemId, quantity } = req.body || {};
    const cart = await cartService.addItem(store, {
      userId: String(userId || ""),
      itemId: String(itemId || ""),
      quantity: Number(quantity),
    });

    res.json(cart);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
