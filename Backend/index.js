// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";

// import router from "./Router/StudentRagisterRoute.js";
// import router1 from "./Router/AttendanceRouter.js";

// dotenv.config();

// const app = express();

// app.use(cors());

// // Set body size limit here, once
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// app.use("/uploads", express.static("uploads"));

// const PORT = process.env.PORT || 7000;
// const URL = process.env.MONGOURL;

// mongoose
//   .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("✅ DB Connected Successfully");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server is Running on port: ${PORT}`);
//     });
//   })
//   .catch((error) => console.error("❌ DB Connection Error:", error));

// app.use("/api", router);
// app.use("/api", router1);
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";

// import router from "./Router/StudentRagisterRoute.js";
// import router1 from "./Router/AttendanceRouter.js";

// dotenv.config();

// const app = express();

// app.use(cors());

// // Set body size limit here, once
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// app.use("/uploads", express.static("uploads"));

// const PORT = process.env.PORT || 7000;
// const URL = process.env.MONGOURL;

// mongoose
//   .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("✅ DB Connected Successfully");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server is Running on port: ${PORT}`);
//     });
//   })
//   .catch((error) => console.error("❌ DB Connection Error:", error));

// app.use("/api", router);
// app.use("/api", router1);

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import studentRouter from "./Router/StudentRagisterRoute.js";
// import attendanceRouter from "./Router/AttendanceRouter.js";
// import userRouter from "./Router/user.js";
// import StudentModel from "./Model/StudentRagisterModel.js"; // Make sure this path is correct

// dotenv.config();

// const app = express();

// const frontendOrigin = "http://localhost:5173";

// app.use(
//   cors({
//     origin: frontendOrigin,
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));
// app.use("/uploads", express.static("uploads"));

// const PORT = process.env.PORT || 7070;
// const URL = process.env.MONGOURL;

// mongoose
//   .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("✅ DB Connected Successfully");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server is Running on port: ${PORT}`);
//     });
//   })
//   .catch((error) => console.error("❌ DB Connection Error:", error));

// app.use("/api/student", studentRouter);
// app.use("/api/attendance", attendanceRouter);
// app.use("/api/user", userRouter);

// // ✅ New route for StdDisplays
// app.get("/api/StdDisplays", async (req, res) => {
//   try {
//     const students = await StudentModel.find();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching students", error });
//   }
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import router from "./Router/StudentRagisterRoute.js";
import router1 from "./Router/AttendanceRouter.js";
import UserRoutes from "./Router/user.js";
import adminRoutes from "./Router/admin.js";
import StudentRouter from "./Router/StudentRagisterRoute.js";
import facultyRoutes from "./Router/facultyRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies/auth headers
  })
);

// Set body size limit here, once
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

app.use("/api", router);
app.use("/api", router1);
app.use("/api/user", UserRoutes);
app.use("/api", adminRoutes);
app.use("/api", StudentRouter);
app.use("/api/faculty", facultyRoutes);
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ DB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is Running on port: ${PORT}`);
    });
  })
  .catch((error) => console.error("❌ DB Connection Error:", error));
