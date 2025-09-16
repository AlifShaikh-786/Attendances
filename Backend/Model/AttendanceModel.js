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
  batch: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    // enum: ["Present", "Absent", "Leave"],
    required: true,
  },
  reportType: {
    type: String,
  },
  Time: {
    type: String,
    required: true,
  },
  Times: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  mName: {
    type: String,
    required: true,
  },
  rollNo_id: {
    type: String,
    required: true,
  },
  facultyId_id: {
    type: String,

    unique: true,
    default: null,
  },
  department: {
    type: String,

    default: "",
  },
  batch: { type: String, default: "" },
});

export default mongoose.model("AttendanceAdd", AttendanceSchema);
