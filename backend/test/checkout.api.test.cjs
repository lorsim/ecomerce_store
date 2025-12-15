const request = require("supertest");
const { createApp } = require("../src/app.js");

describe("Checkout API without discount", () => {
  let app;

  beforeEach(() => {
    ({ app } = createApp({ nth: 2 }));
  });

  test("POST /api/checkout requires userId", async () => {
    const res = await request(app).post("/api/checkout").send({}).expect(400);
    expect(res.body.error).toMatch(/User ID is required for checkout/i);
  });

  test("POST /api/checkout fails when cart is empty", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .send({ userId: "u1" })
      .expect(400);

    expect(res.body.error).toMatch(/Cart is empty/i);
  });

  test("checkout succeeds, returns totals, and clears cart", async () => {
    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "apple", quantity: 2 })
      .expect(200);

    const out = await request(app)
      .post("/api/checkout")
      .send({ userId: "u1" })
      .expect(200);

    expect(out.body.orderId).toMatch(/^ord_/);
    expect(out.body.subtotal).toBe(100);
    expect(out.body.discountAmount).toBe(0);
    expect(out.body.total).toBe(out.body.subtotal);

    const cart = await request(app)
      .get("/api/cart")
      .query({ userId: "u1" })
      .expect(200);

    expect(cart.body.items).toEqual([]);
    expect(cart.body.subtotal).toBe(0);
  });

  test("checkout totals with multiple items", async () => {
    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "apple", quantity: 2 })
      .expect(200);

    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "milk", quantity: 1 })
      .expect(200);

    const out = await request(app)
      .post("/api/checkout")
      .send({ userId: "u1" })
      .expect(200);

    const expected = 100 + 70;
    expect(out.body.subtotal).toBe(expected);
    expect(out.body.total).toBe(expected);
  });
});

describe("Checkout API with discount on nth order and single use", () => {
  let app;

  beforeEach(() => {
    ({ app } = createApp({ nth: 2 }));
  });

  async function addAndCheckout(userId) {
    await request(app)
      .post("/api/cart/items")
      .send({ userId, itemId: "apple", quantity: 2 })
      .expect(200);

    return request(app).post("/api/checkout").send({ userId }).expect(200);
  }

  test("Nth order generates discount code (NTH=2)", async () => {
    const o1 = await addAndCheckout("u1");
    expect(o1.body.generateNewDiscount?.generated).toBe(false);

    const o2 = await addAndCheckout("u2");
    expect(o2.body.generateNewDiscount?.generated).toBe(true);
    expect(o2.body.generateNewDiscount.code).toMatch(/^SAVE10-/);
  });

  test("valid code applies 10% discount to entire order", async () => {
    await addAndCheckout("u1");
    const o2 = await addAndCheckout("u2");
    const code = o2.body.generateNewDiscount.code;

    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u3", itemId: "apple", quantity: 2 })
      .expect(200);

    const out = await request(app)
      .post("/api/checkout")
      .send({ userId: "u3", discountCode: code })
      .expect(200);

    expect(out.body.subtotal).toBe(100);
    expect(out.body.discountAmount).toBe(10);
    expect(out.body.total).toBe(90);
  });

  test("discount code cannot be reused (second attempt fails)", async () => {
    await addAndCheckout("u1");
    const o2 = await addAndCheckout("u2");
    const code = o2.body.generateNewDiscount.code;

    // First use
    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u3", itemId: "apple", quantity: 2 })
      .expect(200);

    await request(app)
      .post("/api/checkout")
      .send({ userId: "u3", discountCode: code })
      .expect(200);

    // Second use
    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u4", itemId: "apple", quantity: 2 })
      .expect(200);

    const res2 = await request(app)
      .post("/api/checkout")
      .send({ userId: "u4", discountCode: code })
      .expect(400);

    expect(res2.body.error).toMatch(/Discount code already used/i);
  });

  test("does NOT generate new code on nth if an unused active code already exists", async () => {
    // generate code on 2nd order
    await addAndCheckout("u1");
    const o2 = await addAndCheckout("u2");
    const code = o2.body.generateNewDiscount.code;

    // Next nth is 4, but code is still unused -> should not generate new one
    const o3 = await addAndCheckout("u3");
    expect(o3.body.generateNewDiscount.generated).toBe(false);

    const o4 = await addAndCheckout("u4");
    expect(o4.body.generateNewDiscount.generated).toBe(false);
    expect(o4.body.generateNewDiscount.reason).toMatch(
      /Unused active discount code already exists/i
    );
  });
});
