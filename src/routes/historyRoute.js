import express from "express";
import { fetchHistory } from "../controllers/fetchHistory.js";
import checkAuth from "../middlewares/checkAuth.js";

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Fetch historical exchange rates
 *     description: Retrieve historical exchange rates for a given base and target currency on a specific date.
 *     tags:
 *       - History
 *     parameters:
 *       - in: query
 *         name: baseCurrency
 *         required: true
 *         schema:
 *           type: string
 *         description: The base currency (e.g., USD).
 *       - in: query
 *         name: targetCurrency
 *         required: true
 *         schema:
 *           type: string
 *         description: The target currency (e.g., EUR).
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date for historical data (YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: Historical exchange rates fetched successfully.
 *       400:
 *         description: Missing required query parameters.
 */

const router = express();

router.get('/', checkAuth,fetchHistory)


export default router;