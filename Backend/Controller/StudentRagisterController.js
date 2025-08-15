import fs from "fs";
import path from "path";
import StudentRagisterSchema from "../Model/StudentRagisterModel.js";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

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
      password,
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
      password,
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

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await StudentRagisterSchema.findOne({ email });
    if (!student || student.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.stdName,
        email: student.email,
        rollNo: student.rollNo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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

// export const StdDisplay = async (req, res) => {
//   try {
//     const { div, semester, Class } = req.body;

//     // Find students matching all three fields
//     const display = await StudentRagisterSchema.find({
//       Class,
//       semester,
//       div,
//     });

//     if (!display || display.length === 0) {
//       return res.status(404).json({
//         msg: "Student with provided Class, Semester, and Div not found",
//       });
//     }

//     // Student(s) found
//     res.status(200).json(display);
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// };

// export const StdDisplay = async (req, res) => {
//   try {
//     const { div, semester, Class } = req.body;

//     // Find students with only needed fields
//     const display = await StudentRagisterSchema.find(
//       { Class, semester, div },
//       { stdName: 1, rollNo: 1, image: 1, faceDescriptor: 1 } // only required fields
//     ).lean(); // lean() returns plain JS objects instead of Mongoose docs

//     if (!display || display.length === 0) {
//       return res.status(404).json({
//         msg: "Student with provided Class, Semester, and Div not found",
//       });
//     }

//     // ✅ Convert Buffer -> number[] if stored as Buffer
//     const formatted = display.map((student) => {
//       let faceDesc = student.faceDescriptor || [];

//       // If it's a Buffer or single descriptor, normalize to [[...]]
//       if (!Array.isArray(faceDesc)) {
//         faceDesc = [];
//       } else if (faceDesc.length === 128 && typeof faceDesc[0] === "number") {
//         // Single descriptor → wrap in another array
//         faceDesc = [faceDesc];
//       } else if (faceDesc.length > 0 && faceDesc[0].data) {
//         // If stored as array of Buffers
//         faceDesc = faceDesc.map((fd) => Array.from(fd.data));
//       }

//       return {
//         _id: student._id.toString(),
//         stdName: student.stdName,
//         rollNo: student.rollNo,
//         image: student.image || [],
//         faceDescriptor: faceDesc,
//       };
//     });

//     res.status(200).json(formatted);
//   } catch (error) {
//     console.error("StdDisplay error:", error);
//     return res.status(500).json({ msg: error.message });
//   }
// };

export const StdDisplay = async (req, res) => {
  try {
    const { div, semester, Class } = req.body;

    // Step 1: Find students with only needed fields
    let display = await StudentRagisterSchema.find(
      { Class, semester, div },
      { stdName: 1, rollNo: 1, image: 1, faceDescriptor: 1 }
    ).lean();

    if (!display || display.length === 0) {
      return res.status(404).json({
        msg: "Student with provided Class, Semester, and Div not found",
      });
    }

    // Step 2: Convert Buffer -> number[] if stored as Buffer
    display = display.map((student) => {
      let faceDesc = student.faceDescriptor || [];

      if (!Array.isArray(faceDesc)) {
        faceDesc = [];
      } else if (faceDesc.length === 128 && typeof faceDesc[0] === "number") {
        // Single descriptor → wrap in another array
        faceDesc = [faceDesc];
      } else if (faceDesc.length > 0 && faceDesc[0].data) {
        // If stored as array of Buffers
        faceDesc = faceDesc.map((fd) => Array.from(fd.data));
      }

      return {
        _id: student._id.toString(),
        stdName: student.stdName,
        rollNo: student.rollNo,
        image: student.image || [],
        faceDescriptor: faceDesc,
      };
    });

    // Step 3: Keep only valid students with [[128 floats]]
    const validStudents = display.filter(
      (s) =>
        Array.isArray(s.faceDescriptor) &&
        s.faceDescriptor.length > 0 &&
        s.faceDescriptor.every((fd) => Array.isArray(fd) && fd.length === 128)
    );

    res.status(200).json(validStudents);
  } catch (error) {
    console.error("StdDisplay error:", error);
    return res.status(500).json({ msg: error.message });
  }
};
