import express from "express";

import { AddAttendance } from "../Controller/AttendanceController.js";

const router1 = express.Router();

router1.post("/AddAttendances", AddAttendance);

export default router1;
