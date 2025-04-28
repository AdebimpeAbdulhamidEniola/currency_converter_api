import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { convert, reverse } from "../controllers/conversionController.js";

const router = express();

/**
 * @swagger
 * /conversion/convert:
 *   post:
 *     summary: Convert currency
 *     description: Convert an amount from one currency to another.
 *     tags:
 *       - Conversion
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               convertFrom:
 *                 type: string
 *                 example: USD
 *               convertTo:
 *                 type: string
 *                 example: EUR
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Conversion successful.
 *       400:
 *         description: Invalid input.
 */

/**
 * @swagger
 * /conversion/reverse:
 *   post:
 *     summary: Reverse convert currency
 *     description: Reverse convert an amount between two currencies.
 *     tags:
 *       - Conversion
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               convertFrom:
 *                 type: string
 *                 example: USD
 *               convertTo:
 *                 type: string
 *                 example: EUR
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Reverse conversion successful.
 *       400:
 *         description: Invalid input.
 */

router.post('/convert', checkAuth, convert);
router.post('/reverse', checkAuth, reverse);

export default router;
