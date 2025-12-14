export async function getCart(store, userId) {
  if (!userId) {
    throw new Error("User ID is required to get cart");
  }

  if (!store.carts.has(userId)) {
    store.carts.set(userId, { userId, items: [], subtotal: 0 });
  }
  return store.carts.get(userId);
}

export async function addItem(store, { userId, itemId, quantity }) {
  if (!userId) {
    throw new Error("User ID is required to add item to cart");
  }

  if (!itemId) {
    throw new Error("Item ID is required to add item to cart");
  }

  if (!Number.isInteger(quantity) || Number(quantity) < 1) {
    throw new Error("Quantity must be an integer >= 1");
  }

  const product = store.catalog[itemId];
  if (!product) {
    throw new Error(`Item with ID ${itemId} does not exist in catalog`);
  }

  const cart = await getCart(store, userId);

  const existingItemIndex = cart.items.findIndex(
    (item) => item.itemId === itemId
  );
  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].subtotal =
      cart.items[existingItemIndex].quantity *
      cart.items[existingItemIndex].price;
  } else {
    cart.items.push({
      itemId,
      quantity,
      price: product.price,
      subtotal: product.price * quantity,
    });
  }

  cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
  store.carts.set(userId, cart);
  return cart;
}

export async function clearCart(store, userId) {
  store.carts.set(userId, { userId, items: [], total: 0 });
}
