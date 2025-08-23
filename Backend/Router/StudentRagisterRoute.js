// Router/StudentRagisterRoute.js
import express from "express";
import {
  registerStudent,
  StdDisplay,
  StdRagistration,
  loginStudent,
  facultyRagistration,
} from "../Controller/StudentRagisterController.js";
import { upload } from "../authintication/multerConfig.js";

const router = express.Router();

// Student registration routes
router.post("/StdRagistrations", StdRagistration);
router.post("/StdDisplays", StdDisplay);
router.post("/Stdlogin", loginStudent);
router.post("/facultyRagistrations", facultyRagistration);
router.post("/register", upload.single("image"), registerStudent);

// Block GET requests to login
// router.get("/Stdlogin", (req, res) => {
//   res.status(405).json({ error: "Use POST method for login" });
// });

export default router;
