import { Router } from "express";
import {
  getAllBranches,
  getBranchBySlug,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { validate } from "../middleware/validate.js";
import { branchValidationRules } from "../validators/branchValidator.js";

const router = Router();

router.get("/", getAllBranches);
router.get("/:slug", getBranchBySlug);

router.post("/", requireAdmin, branchValidationRules, validate, createBranch);
router.put("/:id", requireAdmin, branchValidationRules, validate, updateBranch);
router.delete("/:id", requireAdmin, deleteBranch);

export default router;