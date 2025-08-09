// import express from "express";
// import StudentRagisterSchema from "../Model/StudentRagisterModel.js";
// import { euclideanDistance } from "../authintication/compareDescriptor.js";

// export const recognizeFace = async (req, res) => {
//   const { descriptor } = req.body;

//   if (!descriptor) {
//     return res.status(400).json({ error: "No descriptor provided" });
//   }

//   try {
//     const students = await StudentRagisterSchema.find();
//     let bestMatch = null;
//     let minDistance = Infinity;

//     students.forEach((student) => {
//       const distance = euclideanDistance(student.faceDescriptor, descriptor);
//       if (distance < minDistance) {
//         minDistance = distance;
//         bestMatch = student;
//       }
//     });

//     const THRESHOLD = 0.6;

//     if (minDistance < THRESHOLD) {
//       return res.json({
//         message: "Face recognized",
//         student: {
//           name: bestMatch.name,
//           email: bestMatch.email,
//           rollNo: bestMatch.rollNo,
//         },
//         distance: minDistance,
//       });
//     } else {
//       return res
//         .status(404)
//         .json({ message: "No matching face found", distance: minDistance });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Recognition failed" });
//   }
// };

// module.exports = {
//   recognizeFace,
// };
