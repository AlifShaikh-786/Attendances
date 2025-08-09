import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema({
  Class: {
    type: String,
    required: true,
  },

  semester: {
    type: String,
    required: true,
  },

  div: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    // enum: ["Present", "Absent", "Leave"],
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
  stdName: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
});

export default mongoose.model("AttendanceAdd", AttendanceSchema);
