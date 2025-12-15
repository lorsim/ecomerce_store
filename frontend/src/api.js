const BASE_URL = "";

async function parseJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export async function getCart(userId) {
  const res = await fetch(
    `${BASE_URL}/api/cart?userId=${encodeURIComponent(userId)}`
  );
  return parseJson(res);
}

export async function addToCart({ userId, itemId, quantity }) {
  const res = await fetch(`${BASE_URL}/api/cart/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, itemId, quantity }),
  });
  return parseJson(res);
}

export async function checkout({ userId, discountCode }) {
  const body = { userId };
  if (discountCode) body.discountCode = discountCode;

  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson(res);
}

export async function getMetrics() {
  const res = await fetch(`${BASE_URL}/api/admin/metrics`);
  return parseJson(res);
}
