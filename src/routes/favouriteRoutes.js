import express from "express"; 
import { getFavourites, saveFavourites } from "../controllers/favouriteController.js";
import checkAuth from "../middlewares/checkAuth.js";

/**
 * @swagger
 * /favourites:
 *   post:
 *     summary: Save a favourite currency pair
 *     description: Save a currency pair as a favourite for the user.
 *     tags:
 *       - Favourites
       security:
         -bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favouriteBaseCurrency:
 *                 type: string
 *                 example: USD
 *               favouriteTargetCurrency:
 *                 type: string
 *                 example: EUR
 *     responses:
 *       200:
 *         description: Favourite saved successfully.
 *       400:
 *         description: Invalid input.
 */

/**
 * @swagger
 * /favourites:
 *   get:
 *     summary: Get all favourite currency pairs
 *     description: Retrieve a list of all favourite currency pairs for a user.
 *     tags:
 *       - Favourites
 *     responses:
 *       200:
 *         description: List of favourites retrieved successfully.
 */

const router = express();

//Save a favourite pair to the database
router.post('/', checkAuth, saveFavourites)
router.get('/', checkAuth, getFavourites)

export default router;
