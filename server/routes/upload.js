import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { uploadImage } from "../controllers/uploadController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.post("/", requireAdmin, upload.single("image"), uploadImage);

export default router;