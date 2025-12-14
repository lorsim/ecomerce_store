import { Router } from "express";
import { getCart, addItem } from "../controllers/cart.controller.js";

const router = Router();
router.get("/", getCart);
router.post("/items", addItem);

export default router;
