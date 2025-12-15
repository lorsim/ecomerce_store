const request = require("supertest");
const { createApp } = require("../src/app.js");

describe("Cart API", () => {
  let app;

  beforeEach(() => {
    ({ app } = createApp({ nth: 2 }));
  });

  test("GET /api/cart requires userId", async () => {
    const res = await request(app).get("/api/cart").expect(400);
    expect(res.body.error).toMatch(/User ID is required to get cart/i);
  });

  test("GET /api/cart returns empty cart", async () => {
    const res = await request(app).get("/api/cart").query({ userId: "u1" });

    expect(res.body).toEqual({
      userId: "u1",
      items: [],
      subtotal: 0,
    });
  });

  test("GET /api/cart trims userId", async () => {
    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "apple", quantity: 1 })
      .expect(200);

    const res = await request(app)
      .get("/api/cart")
      .query({ userId: "u1\n" })
      .expect(200);

    expect(res.body.userId).toBe("u1");
    expect(res.body.items.length).toBe(1);
  });

  test("POST /api/cart/items rejects missing userId", async () => {
    const res = await request(app)
      .post("/api/cart/items")
      .send({ itemId: "apple", quantity: 1 })
      .expect(400);

    expect(res.body.error).toMatch(/User ID is required to add item to cart/i);
  });

  test("POST /api/cart/items requires itemId", async () => {
    const res = await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", quantity: 1 })
      .expect(400);

    expect(res.body.error).toMatch(/Item ID is required to add item to cart/i);
  });

  test("POST /api/cart/items rejects quantity < 1", async () => {
    const res = await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "apple", quantity: 0 })
      .expect(400);

    expect(res.body.error).toMatch(/Quantity must be an integer >= 1/i);
  });

  test("POST /api/cart/items rejects unknown itemId", async () => {
    const res = await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "does_not_exist", quantity: 1 })
      .expect(400);

    expect(res.body.error).toMatch(
      /Item with ID does_not_exist does not exist in catalog/i
    );
  });

  test("POST /api/cart/items adds first item and updates subtotal", async () => {
    const res = await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "apple", quantity: 2 })
      .expect(200);

    expect(res.body.userId).toBe("u1");
    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0].itemId).toBe("apple");
    expect(res.body.items[0].quantity).toBe(2);
    expect(res.body.items[0].price).toBeGreaterThan(0);
    expect(res.body.items[0].subtotal).toBe(res.body.items[0].price * 2);
    expect(res.body.subtotal).toBe(res.body.items[0].subtotal);
  });

  test("POST /api/cart/items merges same item (increments quantity)", async () => {
    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "apple", quantity: 2 })
      .expect(200);

    const res = await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "apple", quantity: 3 })
      .expect(200);

    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0].quantity).toBe(5);
    expect(res.body.items[0].subtotal).toBe(res.body.items[0].price * 5);
    expect(res.body.subtotal).toBe(res.body.items[0].subtotal);
  });

  test("POST /api/cart/items supports multiple items and sums subtotal", async () => {
    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "apple", quantity: 2 })
      .expect(200);

    const res = await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "milk", quantity: 1 })
      .expect(200);

    expect(res.body.items).toHaveLength(2);
    const expected = res.body.items.reduce((s, it) => s + it.subtotal, 0);
    expect(res.body.subtotal).toBe(expected);
  });
});
