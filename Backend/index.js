import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
// ======

import router from "./Router/StudentRagisterRoute.js";
import router1 from "./Router/AttendanceRouter.js";

dotenv.config(); // ✅ Load env variables first

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ❌ You had a typo: `urlenrightcoded`

// ✅ Constants
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

// ✅ Database Connection
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
