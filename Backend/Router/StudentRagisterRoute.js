// Router/StudentRagisterRoute.js
import express from "express";
import {
  registerStudent,
  StdDisplay,
  StdRagistration,
  loginStudent,
  facultyRagistration,
  RagistarByuploadExcel,
  EditUserProfile,
  displayUsers,
  resetPasswordWithOtp,
  sendOtpToEmail,
  DeleteUsers,
} from "../Controller/StudentRagisterController.js";
import { upload, uploadExcel } from "../authintication/multerConfig.js";

const router = express.Router();

// Student registration routes
router.post("/StdRagistrations", StdRagistration);
router.post("/StdDisplays", StdDisplay);
router.post("/Stdlogin", loginStudent);
router.post("/facultyRagistrations", facultyRagistration);
router.post("/register", upload.single("image"), registerStudent);
router.post(
  "/RagistarByuploadExcels",
  uploadExcel.single("file"),
  RagistarByuploadExcel
);
router.put("/EditUserProfiles/:id", EditUserProfile);
router.delete("/DeleteUsers/:id", DeleteUsers);
router.get("/displayUsers-s", displayUsers);
router.post("/resetPasswordWithOtp-s", resetPasswordWithOtp);
router.post("/sendOtpToEmail-s", sendOtpToEmail);
// Block GET requests to login
// router.get("/Stdlogin", (req, res) => {
//   res.status(405).json({ error: "Use POST method for login" });
// });

export default router;
