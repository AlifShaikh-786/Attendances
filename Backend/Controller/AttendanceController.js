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
      return res
        .status(400)
        .json({
          message:
            "Attendance list is required and should be a non-empty array.",
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
