import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { saveAlertDetails } from "../controllers/alertsController.js";

/**
 * @swagger
 * /alerts:
 *   post:
 *     summary: Create a rate alert
 *     description: Create a rate alert for a specific currency pair and threshold.
 *     tags:
 *       - Alerts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               baseCurrency:
 *                 type: string
 *                 example: USD
 *               targetCurrency:
 *                 type: string
 *                 example: EUR
 *               thresholdRate:
 *                 type: number
 *                 example: 0.85
 *     responses:
 *       200:
 *         description: Rate alert created successfully.
 *       400:
 *         description: Invalid input.
 */

const router = express();

router.post('/', checkAuth,saveAlertDetails)

export default router;