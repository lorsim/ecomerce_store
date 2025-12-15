import express from "express";
import cors from "cors";
import { createStore } from "./store.js";

import cartRoutes from "./routes/cart.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import adminRoutes from "./routes/admin.routes.js";

export function createApp({ nth }) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const store = createStore({ nth });
  app.locals.store = store;

  app.use("/api/cart", cartRoutes);
  app.use("/api/checkout", checkoutRoutes);
  app.use("/api/admin", adminRoutes);

  return { app, store };
}
