import express from "express";
import {
  registerStudent,
  StdDisplay,
  StdRagistration,
} from "../Controller/StudentRagisterController.js";
import { upload } from "../authintication/multerConfig.js";

const router = express.Router();

router.post("/StdRagistrations", StdRagistration);
router.post("/StdDisplays", StdDisplay);

// ✅ Correct multer usage: `upload.single('image')`
router.post("/register", upload.single("image"), registerStudent);

export default router;
