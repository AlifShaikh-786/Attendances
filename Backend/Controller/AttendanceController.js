import express from "express";
import AttendanceSchema from "../Model/AttendanceModel.js";

// export const AddAttendance = async (req, res) => {
//   try {
//     const {
//       Class,
//       semester,
//       div,
//       image,
//       stdName,
//       date,
//       Time,
//       rollNo,
//       status,
//       Subject,
//     } = req.body;

//     const attendance = new AttendanceSchema({
//       Class,
//       semester,
//       div,
//       image,
//       stdName,
//       date,
//       Time,
//       rollNo,
//       status,
//       Subject,
//     });

//     const savedAttendance = await attendance.save();
//     res.status(200).json(savedAttendance);
//   } catch (error) {
//     console.error("Error saving attendance:", error);
//     return res.status(500).json({ message: "Internal server error", error });
//   }
// };

export const AddAttendance = async (req, res) => {
  try {
    const { attendanceList } = req.body; // expect attendanceList as array of attendance objects

    if (
      !attendanceList ||
      !Array.isArray(attendanceList) ||
      attendanceList.length === 0
    ) {
      return res.status(400).json({
        message: "Attendance list is required and should be a non-empty array.",
      });
    }

    // Validate each attendance object (optional but recommended)

    // Save all attendance entries in parallel
    const savedAttendances = await AttendanceSchema.insertMany(attendanceList);

    res
      .status(201)
      .json({ message: "Attendances saved successfully", savedAttendances });
  } catch (error) {
    console.error("Error saving attendance:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// const DisplayReport = await AttendanceSchema.find({
//   Class: new RegExp(`^${Class}$`, "i"),
//   semester: new RegExp(`^${semester}$`, "i"),
//   div: new RegExp(`^${div}$`, "i"),
//   rollNo: new RegExp(`^${rollNo}$`, "i"),
//   Subject: new RegExp(`^${Subject}$`, "i"),
// });

// export const AttendanceReport = async (req, res) => {
//   try {
//     const { Class, semester, div, rollNo, Subject } = req.body;

//     const DisplayReport = await AttendanceSchema.find({
//       Class,
//       semester,
//       div,
//       rollNo,
//       Subject,
//     });

//     res.status(200).json(DisplayReport);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ msg: "Internal server error", error: error.message });
//   }
// };

// Attendance  Report page
export const AttendanceReport = async (req, res) => {
  try {
    const { Class, semester, div, rollNo_id, Subject, date, batch, status } =
      req.body;

    let query = {};
    if (batch && batch.trim() !== "") query.batch = batch;
    if (Class && Class.trim() !== "") query.Class = Class;
    if (semester && semester.trim() !== "") query.semester = semester;
    if (div && div.trim() !== "") query.div = div;
    if (rollNo_id && rollNo_id.trim() !== "") query.rollNo_id = rollNo_id;
    if (Subject && Subject.trim() !== "") query.Subject = Subject;
    if (date && date.trim() !== "") query.date = date;
    if (status && status.trim() !== "") query.status = status;

    const DisplayReport = await AttendanceSchema.find(query);

    if (!DisplayReport || DisplayReport.length === 0) {
      return res.status(404).json({ msg: "No students found" });
    }

    res.status(200).json(DisplayReport);
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

// Update attendance report

export const UpdateAttendances = async (req, res) => {
  try {
    const UpdateAttendance = await AttendanceSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(UpdateAttendance);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//
// export const AttendanceReport = async (req, res) => {
//   try {
//     const { Class, semester, div, rollNo, Subject } = req.body;

//     console.log("📩 Request body:", req.body);

//     const query = { Class, semester, div, rollNo, Subject };
//     console.log("🔍 DB query:", query);

//     const DisplayReport = await AttendanceSchema.find(query);

//     console.log("📊 DB result:", DisplayReport);

//     if (!DisplayReport || DisplayReport.length === 0) {
//       return res.status(404).json({
//         msg: "No students found for provided filters",
//       });
//     }

//     res.status(200).json(DisplayReport);
//   } catch (error) {
//     console.error("❌ Error fetching attendance report:", error.message);
//     return res
//       .status(500)
//       .json({ msg: "Internal server error", error: error.message });
//   }
// };
