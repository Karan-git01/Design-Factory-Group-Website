import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  submitContact,
  getAllSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from "../controllers/contactController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many submissions. Please try again later." },
});

// Public
router.post("/", contactLimiter, submitContact);

// Admin-only
router.get("/", requireAdmin, getAllSubmissions);
router.patch("/:id", requireAdmin, updateSubmissionStatus);
router.delete("/:id", requireAdmin, deleteSubmission);

export default router;