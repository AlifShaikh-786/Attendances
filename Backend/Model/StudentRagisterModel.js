    import mongoose, { Schema } from "mongoose";

    const StudentRagisterSchema = new mongoose.Schema({
    StdName: {
        type: String,
        required: true,
    },
      RollNo: {
        type: String,
        required: true,
    },
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
    });
    export default mongoose.model("StudentRagisterModels", StudentRagisterSchema);
