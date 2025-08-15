import express from "express";
import {
  registerFaculty,
  loginFaculty,
} from "../Controller/facultyController.js";
import { upload } from "../authintication/multerConfig.js";

const router = express.Router();

// Faculty Registration with image upload
router.post("/register", upload.single("image"), registerFaculty);

// Faculty Login
router.post("/login", loginFaculty);

// Optional: prevent GET requests on login
// router.get("/login", (req, res) => {
//   res.status(405).json({ error: "Use POST method for login" });
// });

export default router;
