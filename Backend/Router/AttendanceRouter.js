// Router/AttendanceRouter.js
import express from "express";

import {
  AddAttendance,
  AttendanceReport,
} from "../Controller/AttendanceController.js";

const router1 = express.Router();

router1.post("/AddAttendances", AddAttendance);
router1.post("/AttendanceReports", AttendanceReport);

export default router1;
