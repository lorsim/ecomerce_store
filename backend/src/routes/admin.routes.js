import { Router } from "express";
import { generateDiscount, metrics } from "../controllers/admin.controller.js";

const router = Router();
router.post("/discount/generate", generateDiscount);
router.get("/metrics", metrics);

export default router;
