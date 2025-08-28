import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const info = transporter.sendMail({
      from: `"DYPIMED Campus:",<${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("email send", info.messageId);
  } catch (error) {
    console.error("Error Message: ", error);
  }
};
