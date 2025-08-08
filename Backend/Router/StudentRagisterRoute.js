import express from "express";
import { StdDisplay, StdRagistration } from "../Controller/StudentRagisterController.js";

const router = express.Router();

// ✅ YOUR CURRENT ROUTE:
router.post("/StdRagistrations", StdRagistration);
router.post("/StdDisplays",StdDisplay)

export default router;
