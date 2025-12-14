import express from "express";
import { createStore } from "./store.js";

import cartRoutes from "./routes/cart.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
app.use(express.json());

const nth = Number(process.env.NTH || 1);
const store = createStore({ nth });
app.locals.store = store;

app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);

export { app };
