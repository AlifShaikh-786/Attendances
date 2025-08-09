import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import router from "./Router/StudentRagisterRoute.js";
import router1 from "./Router/AttendanceRouter.js";

dotenv.config();

const app = express();

app.use(cors());

// Set body size limit here, once
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ DB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is Running on port: ${PORT}`);
    });
  })
  .catch((error) => console.error("❌ DB Connection Error:", error));

app.use("/api", router);
app.use("/api", router1);
