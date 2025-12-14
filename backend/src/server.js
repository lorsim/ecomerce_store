import express from "express";
import { createStore } from "./store.js";

const app = express();
app.use(express.json());

const store = createStore({ nth: 5 });

app.locals.store = store;

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);

export { app };
