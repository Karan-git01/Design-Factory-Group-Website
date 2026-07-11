import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { validate } from "../middleware/validate.js";
import { projectValidationRules } from "../validators/projectValidator.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.post("/", requireAdmin, projectValidationRules, validate, createProject);
router.put("/:id", requireAdmin, projectValidationRules, validate, updateProject);
router.delete("/:id", requireAdmin, deleteProject);

export default router;