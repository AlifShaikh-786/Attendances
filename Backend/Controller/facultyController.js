import Faculty from "../Model/facultyModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerFaculty = async (req, res) => {
  try {
    const {
      facultyName,
      facultyId,
      email,
      password,
      department,
      contact,
      subject,
      image,
    } = req.body;

    if (!Array.isArray(image) || image.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    const savedImagePaths = [];

    for (let i = 0; i < image.length; i++) {
      const base64Data = image[i].replace(/^data:image\/\w+;base64,/, "");
      const fileName = `${Date.now()}_${facultyName.replace(
        /\s/g,
        "_"
      )}_${i}.png`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, base64Data, "base64");
      savedImagePaths.push(`/uploads/${fileName}`);
    }

    const newFaculty = new Faculty({
      facultyName,
      facultyId,
      email,
      password,
      department,
      contact,
      subject,
      image: savedImagePaths,
    });

    await newFaculty.save();
    res.status(201).json({ message: "✅ Faculty registered successfully" });
  } catch (error) {
    console.error("Faculty registration error:", error);
    res
      .status(500)
      .json({ message: "❌ Error registering faculty", error: error.message });
  }
};

export const loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });
    if (!faculty || faculty.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Optionally: generate JWT token
    // const token = jwt.sign({ id: faculty._id, email: faculty.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",
      faculty: {
        id: faculty._id,
        name: faculty.facultyName,
        email: faculty.email,
        facultyId: faculty.facultyId,
        department: faculty.department,
        contact: faculty.contact,
        subject: faculty.subject,
        image: faculty.image,
      },
      // token
    });
  } catch (error) {
    console.error("Faculty login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
