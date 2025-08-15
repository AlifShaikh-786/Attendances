import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
  {
    facultyName: {
      type: String,
      required: true,
    },
    facultyId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    subject: {
      type: [String],
      required: true,
    },
    image: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Faculty", FacultySchema);
