import express from "express";
import {
  ApplayApplication,
  approveApplication,
  DisplayApplication,
  rejectApplication,
} from "../Controller/ApplicationController.js";
// import

const router2 = express.Router();

router2.post("/ApplayApplication-s", ApplayApplication);
router2.get("/DisplayApplication-s", DisplayApplication);
// router2.put("/approveApplication/:rollNo_id", approveApplication);
router2.put("/approveApplication/:ApplicationId", approveApplication);
router2.put("/rejectApplication/:ApplicationId", rejectApplication);

export default router2;
