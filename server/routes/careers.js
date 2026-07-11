import { Router } from "express";
import {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobListingController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { validate } from "../middleware/validate.js";
import { jobValidationRules } from "../validators/jobValidator.js";

const router = Router();

router.get("/", getAllJobs);

router.post("/", requireAdmin, jobValidationRules, validate, createJob);
router.put("/:id", requireAdmin, jobValidationRules, validate, updateJob);
router.delete("/:id", requireAdmin, deleteJob);

export default router;