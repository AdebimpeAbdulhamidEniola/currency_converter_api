import express from "express";
import { validateUser } from "../middlewares/inputValidator.js";
import { register, login } from "../controllers/userController.js";

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Email already exists.
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user with email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Authentication successful.
 *       401:
 *         description: Authentication failed.
 */

const router = express();

router.post('/signup', validateUser, register);
router.post('/login', validateUser, login)

export default router;