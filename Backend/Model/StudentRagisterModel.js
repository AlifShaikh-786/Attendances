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
import mongoose from "mongoose";

const StudentRagisterSchema = new mongoose.Schema({
  stdName: { type: String, required: true },
  rollNo: { type: String, required: true },
  Class: { type: String, required: true },
  semester: { type: String, required: true },
  div: { type: String, required: true },
  faceDescriptor: { type: [Number], default: [] },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: [String], default: [] }, // paths to saved images
});

export default mongoose.model("StudentRagisterSchema", StudentRagisterSchema);
