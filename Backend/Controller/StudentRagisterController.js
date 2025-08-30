import fs from "fs";
import xlsx from "xlsx";
import path from "path";
import StudentRagisterSchema from "../Model/StudentRagisterModel.js";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import { constants } from "fs/promises";
import { sendEmail } from "../Utils/sendEmail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// faculty ragistration
export const facultyRagistration = async (req, res) => {
  try {
    const {
      fName,
      mName,
      lName,

      facultyId_id,
      department,
      subject,
      role,

      faceDescriptor,
      email,
      contact,
      password,
    } = req.body;

    const newStudent = new StudentRagisterSchema({
      fName,
      mName,
      lName,

      facultyId_id,
      department,
      subject,
      role,

      faceDescriptor,
      email,
      contact,
      password,
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

// Student ragistration
export const registerStudent = async (req, res) => {
  try {
    const {
      rollNo_id,
      fName,
      mName,
      lName,
      batch,
      year,
      facultyId_id,
      department,
      subject,
      role,
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
      const fileName = `${Date.now()}_${fName.replace(/\s/g, "_")}_${i}.png`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, base64Data, "base64");
      savedImagePaths.push(`/uploads/${fileName}`);
    }

    // Create new student doc
    const newStudent = new StudentRagisterSchema({
      rollNo_id,
      fName,
      mName,
      lName,
      batch,
      year,
      facultyId_id,
      department,
      subject,
      role,
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

// login api
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
      student,
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
    const { div, semester, Class, batch } = req.body;

    // Step 1: Find students with only needed fields
    let display = await StudentRagisterSchema.find(
      { Class, semester, div, batch },
      {
        fName: 1,
        lName: 1,
        mName: 1,
        rollNo_id: 1,
        div: 1,
        image: 1,
        faceDescriptor: 1,
      }
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
      // return res.status(200).join(student);
      return {
        _id: student._id.toString(),
        fName: student.fName,
        mName: student.mName,
        lName: student.lName,
        div: student.div,
        rollNo_id: student.rollNo_id,
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

// API to upload Excel and insert data

export const RagistarByuploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read the Excel file
    const filePath = path.join(req.file.path);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (sheetData.length === 0) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // Loop through each row and insert into DB
    const students = sheetData.map((row) => ({
      rollNo_id: row.rollNo_id || "",
      fName: row.fName || "",
      mName: row.mName || "",
      lName: row.lName || "",
      batch: row.batch || "",
      // year: row.year || "",
      // facultyId_id: row.facultyId_id || "",
      // department: row.department || "",
      // subject: row.subject || "",
      // role: row.role || "student",
      Class: row.Class || "",
      semester: row.semester || "",
      div: row.div || "",
      department: row.department || "",
      faceDescriptor: row.faceDescriptor || "",
      email: row.email || "",
      contact: row.contact || "",
      password: row.password || "",
      image: [], // No image in Excel
    }));

    await StudentRagisterSchema.insertMany(students);

    res.json({ message: "✅ Excel data inserted successfully" });
  } catch (error) {
    console.error("Error uploading Excel:", error);
    res
      .status(500)
      .json({ message: "❌ Error inserting data", error: error.message });
  }
};

// Whitelist fields to avoid unwanted updates
//   const allowedUpdates = ["name", "email", "phone", "address"]; // customize as needed
// const updateData = {};
// for (const key of allowedUpdates) {
//   if (req.body[key] !== undefined) {
//     updateData[key] = req.body[key];
//   }
// }

// Edit profile

export const EditUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;

    const updatedUser = await StudentRagisterSchema.findOneAndUpdate(
      {
        $or: [{ rollNo_id: id }, { facultyId_id: id }],
      },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res
      .status(200)
      .json({ msg: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error editing profile:", error);
    return res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

// Display Info

export const displayUsers = async (req, res) => {
  try {
    const users = await StudentRagisterSchema.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error Display User Info:", error);
    return res.status(500).json({ error: error.message });
  }
};

// delete user
export const DeleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const userDelete = await StudentRagisterSchema.findOneAndDelete({
      $or: [{ rollNo_id: id }, { facultyId_id: id }],
    });

    if (!userDelete) {
      return res.status(404).json({ msg: "User Not Found!" });
    }

    return res.status(200).json({
      msg: "✅ User deleted successfully",
      user: userDelete,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// export const DeleteUsers = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // const updateData = req.body;
//     const userDelete = await StudentRagisterSchema.findOneAndDelete({
//       $or: [{ rollNo_id: id }, { facultyId_id: id }],
//     });
//     if (!userDelete) {
//       return res.status(404).json({ msg: "User Not Found!" });
//     }
//     return res
//       .status(200)
//       .json({ msg: "User Delete Succesfully.", user: userDelete });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

//                                  email section
// ====================================================================================================================

export const resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Fetch user with await
    const user = await StudentRagisterSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // Check OTP expiry
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    // Update password (you should hash it)
    user.password = newPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();
    res.status(200).json({ msg: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPasswordWithOtp:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const sendOtpToEmail = async (req, res) => {
  const { email } = req.body;
  const user = await StudentRagisterSchema.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User Not Find." });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 2 * 60 * 1000);
  (user.otp = otp), (user.otpExpiry = expiry), await user.save();
  await sendEmail(
    email,
    `Your OTP for Password Reset: ${otp}. It is valid for 2 minutes.`
  );
  res.status(200).json({ msg: "OTP sent to email" });
};
// ==============================================================================================
