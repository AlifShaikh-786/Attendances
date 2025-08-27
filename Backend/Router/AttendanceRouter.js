// Router/AttendanceRouter.js
import express from "express";

import {
  AddAttendance,
  AttendanceReport,
  UpdateAttendances,
} from "../Controller/AttendanceController.js";

const router1 = express.Router();

router1.post("/AddAttendances", AddAttendance);
router1.post("/AttendanceReports", AttendanceReport);
router1.put("/Update-Attendancess/:id", UpdateAttendances);
export default router1;
