const request = require("supertest");
const { createApp } = require("../src/app.js");

describe("Cart API", () => {
  let app;

  beforeEach(() => {
    ({ app } = createApp({ nth: 2 }));
  });

  test("GET /api/cart returns empty cart", async () => {
    const res = await request(app).get("/api/cart").query({ userId: "u1" });

    expect(res.body).toEqual({
      userId: "u1",
      items: [],
      subtotal: 0,
    });
  });
});
