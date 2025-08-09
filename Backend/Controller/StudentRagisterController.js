import fs from "fs";
import path from "path";
import StudentRagisterSchema from "../Model/StudentRagisterModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerStudent = async (req, res) => {
  try {
    const {
      stdName,
      rollNo,
      Class,
      semester,
      div,
      faceDescriptor,
      email,
      contact,
      image, // array of base64 strings
    } = req.body;

    if (!Array.isArray(image) || image.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Save all images, collect their paths
    const savedImagePaths = [];

    for (let i = 0; i < image.length; i++) {
      const base64Str = image[i];
      const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, "");
      const fileName = `${Date.now()}_${stdName.replace(/\s/g, "_")}_${i}.png`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, base64Data, "base64");
      savedImagePaths.push(`/uploads/${fileName}`);
    }

    // Create new student doc
    const newStudent = new StudentRagisterSchema({
      stdName,
      rollNo,
      Class,
      semester,
      div,
      faceDescriptor,
      email,
      contact,
      image: savedImagePaths,
    });

    await newStudent.save();

    res.json({ message: "✅ Student registered successfully" });
  } catch (error) {
    console.error("Save error:", error);
    res
      .status(500)
      .json({ message: "❌ Error saving student", error: error.message });
  }
};

// create
export const StdRagistration = async (req, res) => {
  try {
    const newStd = new StudentRagisterSchema(req.body);

    const saveStd = await newStd.save();
    res.status(201).json({ msg: "Added Successfully: ", data: saveStd });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// desplai
// export const StdDisplay = async (req, res) => {
//   try {
//     const { div, semester, Class } = req.body;

//     // 🔍 Find student matching all three fields
//     const display = await StudentRagisterSchema.find({
//       Class,
//       semester,
//       div,
//     });

//     if (!display) {
//       return res.status(404).json({
//         msg: "Student with provided Class, Semester, and Div not found",
//       });
//     }

//     // ✅ Student found
//     res.status(200).json(display);
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// };
export const StdDisplay = async (req, res) => {
  try {
    const { div, semester, Class } = req.body;

    // Find students matching all three fields
    const display = await StudentRagisterSchema.find({
      Class,
      semester,
      div,
    });

    if (!display || display.length === 0) {
      return res.status(404).json({
        msg: "Student with provided Class, Semester, and Div not found",
      });
    }

    // Student(s) found
    res.status(200).json(display);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
