import express from "express";
import AttendanceSchema from "../Model/AttendanceModel.js";

export const AddAttendance = async (req, res) => {
  try {
    const {
      Class,
      Semester,
      Div,
      Images,
      StdName,
      date,
      Time,
      RollNo,
      status,
      Subject,
    } = req.body;

    const attendance = new AttendanceSchema({
      Class,
      Semester,
      Div,
      Images,
      StdName,
      date,
      Time,
      RollNo,
      status,
      Subject,
    });

    const savedAttendance = await attendance.save();
    res.status(200).json(savedAttendance);
  } catch (error) {
    console.error("Error saving attendance:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
