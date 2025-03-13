import express from "express";
import { signup, login, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/profile", protect, getUserProfile);

export default router;
