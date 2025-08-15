import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "./Model/admin.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "your_mongo_uri_here";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPlainPassword = process.env.ADMIN_PASSWORD;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPlainPassword, saltRounds);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin already exists");
    } else {
      const newAdmin = new Admin({
        email: adminEmail,
        password: hashedPassword,
      });
      await newAdmin.save();
      console.log("Admin user created");
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding admin:", err);
  }
}

seedAdmin();
