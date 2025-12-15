const request = require("supertest");
const { createApp } = require("../src/app.js");

describe("Admin APIs", () => {
  let app;

  beforeEach(() => {
    ({ app } = createApp({ nth: 2 }));
  });

  test("GET /api/admin/metrics returns zeros initially", async () => {
    const res = await request(app).get("/api/admin/metrics").expect(200);
    expect(res.body.totalOrders).toBe(0);
    expect(res.body.itemsPurchasedCount).toBe(0);
    expect(res.body.totalPurchasedAmount).toBe(0);
    expect(res.body.discountCodes).toBe(0);
    expect(res.body.totalDiscountAmount).toBe(0);
  });

  test("metrics update after multiple orders", async () => {
    // Order 1: apple x2 => 100
    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "apple", quantity: 2 })
      .expect(200);
    await request(app).post("/api/checkout").send({ userId: "u1" }).expect(200);

    // Order 2: milk x1 => 70
    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u2", itemId: "milk", quantity: 1 })
      .expect(200);
    await request(app).post("/api/checkout").send({ userId: "u2" }).expect(200);

    const m = await request(app).get("/api/admin/metrics").expect(200);
    expect(m.body.totalOrders).toBe(2);
    expect(m.body.itemsPurchasedCount).toBe(3); // 2 + 1
    expect(m.body.totalPurchasedAmount).toBe(170); // 100 + 70
  });

  test("totalDiscountAmount increases after discounted checkout", async () => {
    // Generate code (2nd order)
    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u1", itemId: "apple", quantity: 2 })
      .expect(200);
    await request(app).post("/api/checkout").send({ userId: "u1" }).expect(200);

    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u2", itemId: "apple", quantity: 2 })
      .expect(200);
    const o2 = await request(app)
      .post("/api/checkout")
      .send({ userId: "u2" })
      .expect(200);

    const code = o2.body.generateNewDiscount.code;

    await request(app)
      .post("/api/cart/items")
      .send({ userId: "u3", itemId: "apple", quantity: 2 })
      .expect(200);
    await request(app)
      .post("/api/checkout")
      .send({ userId: "u3", discountCode: code })
      .expect(200);

    const m = await request(app).get("/api/admin/metrics").expect(200);
    expect(m.body.totalDiscountAmount).toBe(10);
  });

  test("POST /api/admin/discount/generate not eligible when no orders", async () => {
    const res = await request(app)
      .post("/api/admin/discount/generate")
      .expect(200);
    expect(res.body.generated).toBe(false);
    expect(res.body.reason).toMatch(/No orders placed yet/i);
  });
});
