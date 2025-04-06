import express from "express";
import { validateUser } from "../middlewares/inputValidator.js";
import { register, login } from "../controllers/userController.js";

const router = express();

router.post('/signup', validateUser, register);
router.post('/login', validateUser, login)

export default router;