import { Router } from "express";
import { placeOrder } from "../controllers/checkout.controller.js";

const router = Router();
router.post("/", placeOrder);

export default router;
