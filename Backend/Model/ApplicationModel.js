import mongoose from "mongoose";
const ApplicationSchema = new mongoose.Schema({
  ApplicationId: { type: String, required: true, unique: true },
  rollNo_id: { type: String, required: true },

  fName: { type: String, required: true },
  mName: { type: String, required: true },
  lName: { type: String, required: true },
  batch: { type: String, required: true },

  Class: { type: String, required: true },
  semester: { type: String, required: true },
  div: { type: String, required: true },

  email: { type: String, required: true },
  contact: { type: String, required: true },
  Subject: { type: String, required: true },

  reason: { type: String, required: true },
  Time: { type: String, required: true },
  Status: {
    type: String,
    enum: ["Accept", "Pending", "Reject"],
    default: "Pending",
  },
  date: {
    type: Date,
    required: true,
  },
});
export default mongoose.model("ApplicationSchema", ApplicationSchema);
