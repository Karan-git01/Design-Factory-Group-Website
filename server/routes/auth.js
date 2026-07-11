import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, logout, checkAuth } from "../controllers/authController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts. Please try again later." },
});

router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.get("/check", requireAdmin, checkAuth);

export default router;