// import mongoose, { Schema } from "mongoose";

// const StudentRagisterSchema = new mongoose.Schema({
//   StdName: {
//     type: String,
//     required: true,
//   },
//   RollNo: {
//     type: String,
//     required: true,
//   },
//   Class: {
//     type: String,
//     required: true,
//   },

//   Semester: {
//     type: String,
//     required: true,
//   },

//   Div: {
//     type: String,
//     required: true,
//   },

//   faceDescriptor: [Number],
//   email: {
//     type: String,
//     required: true,
//   },
//   image: [String],
// });
// export default mongoose.model("StudentRagisterModels", StudentRagisterSchema);
// import mongoose, { Schema } from "mongoose";

// const StudentRagisterSchema = new mongoose.Schema({
//   StdName: {
//     type: String,
//
//   },
//   RollNo: {
//     type: String,
//
//   },
//   Class: {
//     type: String,
//
//   },

//   Semester: {
//     type: String,
//
//   },

//   Div: {
//     type: String,
//
//   },

//   faceDescriptor: [Number],
//   email: {
//     type: String,
//
//   },
//   image: [String],
// });
// export default mongoose.model("StudentRagisterModels", StudentRagisterSchema);

import mongoose from "mongoose";

const StudentRagisterSchema = new mongoose.Schema(
  {
    rollNo_id: { type: String, unique: true, default: "" },
    fName: { type: String, default: "" },
    mName: { type: String, default: "" },
    lName: { type: String, default: "" },
    batch: { type: String, default: "" },
    year: { type: String, default: "" },
    Class: { type: String, default: "" },
    semester: { type: String, default: "" },
    div: { type: String, default: "" },
    faceDescriptor: { type: [Number], default: [] },
    email: { type: String, unique: true, default: "" },
    contact: { type: String, unique: true, default: "" },
    password: { type: String, default: "" },
    image: { type: [String], default: [] }, // paths to saved images

    facultyId_id: {
      type: String,

      unique: true,
      default: null,
    },
    department: {
      type: String,

      default: "",
    },
    subject: {
      type: [String],

      default: [],
    },
    role: {
      type: String,
      enum: ["admin", "faculty", "hod", "student"], // Allowed roles
      default: "student", // If not provided, 'student' will be stored
    },
    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("StudentRagisterSchema", StudentRagisterSchema);
