import { generateIfEligible } from "../../services/discount.service.js";
import { getMetrics } from "../../services/metrics.service.js";

export async function generateDiscount(req, res) {
  const store = req.app.locals.store;
  const result = await generateIfEligible(store);
  res.json(result);
}

export async function metrics(req, res) {
  const store = req.app.locals.store;
  const result = await getMetrics(store);
  res.json(result);
}
