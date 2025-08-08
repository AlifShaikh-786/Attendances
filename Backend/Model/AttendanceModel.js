import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema({
  Class: {
    type: String,
    required: true,
  },

  Semester: {
    type: String,
    required: true,
  },

  Div: {
    type: String,
    required: true,
  },
  Images: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"],
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  StdName: {
    type: String,
    required: true,
  },
  RollNo: {
    type: String,
    required: true,
  },
});

export default mongoose.model("AttendanceAdd", AttendanceSchema);
