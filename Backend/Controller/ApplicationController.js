import ApplicationSchema from "../Model/ApplicationModel.js"; // adjust path
import AttendanceSchema from "../Model/AttendanceModel.js";

export const ApplayApplication = async (req, res) => {
  try {
    const {
      rollNo_id,
      fName,
      mName,
      lName,
      batch,
      Class,
      semester,
      div,
      email,
      contact,
      Subject,
      reason,
      date,
      Time,
    } = req.body;

    // Create new application document
    const application = new ApplicationSchema({
      rollNo_id,
      fName,
      mName,
      lName,
      batch,
      Class,
      semester,
      div,
      email,
      contact,
      Subject,
      reason,
      status: "Pending", // default status
      date,
      Time,
    });

    // Save to database
    await application.save();

    res
      .status(201)
      .json({ msg: "Application submitted successfully", application });
  } catch (error) {
    console.error("Error submitting application:", error);
    return res.status(500).json({ error: error.message });
  }
};

// // display application
// export const DisplayApplication = async (req, res) => {
//   try {
//     const display = await ApplicationSchema.find();
//     if (!display) {
//       return res.status(404).json({ msg: "Application not found" });
//     }
//     return res.status(200).json(display);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// import ApplicationSchema from "../models/ApplicationSchema.js";
// import AttendanceAdd from "../models/AttendanceSchema.js";

// export const approveApplication = async (req, res) => {
//   try {
//     const { rollNo_id } = req.params; // Get rollNo_id from URL params

//     // Find the application by rollNo_id
//     const application = await ApplicationSchema.findOne({ rollNo_id });
//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update application status to "Accept"
//     application.Status = "Accept";
//     await application.save();

//     // Update Attendance based on rollNo_id, date, time, and Subject
//     const attendanceUpdate = await AttendanceSchema.updateOne(
//       {
//         rollNo_id: application.rollNo_id,
//         date: application.date,
//         Time: application.Time,
//         Subject: application.Subject,
//       },
//       { $set: { status: "Present" } }
//     );

//     if (attendanceUpdate.modifiedCount === 0) {
//       return res.status(404).json({ message: "Attendance record not found" });
//     }

//     return res.status(200).json({
//       message: "Application approved and attendance updated successfully",
//     });
//   } catch (error) {
//     console.error("Error approving application:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// import ApplicationSchema from "../models/ApplicationSchema.js";
// import AttendanceSchema from "../models/AttendanceSchema.js";

// Display all applications
export const DisplayApplication = async (req, res) => {
  try {
    const display = await ApplicationSchema.find();
    if (display.length === 0) {
      return res.status(404).json({ msg: "No applications found" });
    }
    return res.status(200).json(display);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Approve application and update attendance
// import Application from "../models/ApplicationModel.js";
// import Attendance from "../models/AttendanceModel.js";

export const approveApplication = async (req, res) => {
  const { rollNo_id } = req.params;
  const { Subject, date, Time } = req.body;

  try {
    console.log("✅ Received rollNo_id:", rollNo_id);
    console.log("✅ Body data:", { Subject, date, Time });

    // ✅ 1. Update Application Status
    const application = await ApplicationSchema.findOneAndUpdate(
      { rollNo_id: String(rollNo_id) }, // enforce type as string
      { Status: "Accept" },
      { new: true }
    );

    if (!application) {
      console.log("❌ Application not found in DB for rollNo_id:", rollNo_id);
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ Add debug log before attendance update
    console.log("Looking for attendance with:", {
      rollNo_id,
      Subject,
      date,
      Time,
    });
    // Convert string date to start and end of day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    console.log("Normalized date range:", startOfDay, "to", endOfDay);

    // ✅ 2. Update Attendance (mark as Present)
    const attendance = await AttendanceSchema.findOneAndUpdate(
      {
        rollNo_id,
        Subject: Subject, // ✅ use correct field name as in DB
        Time,
        date: { $gte: startOfDay, $lte: endOfDay },
      },
      { status: "Present" },
      { new: true }
    );

    if (!attendance) {
      console.log("❌ Attendance record not found for:", {
        rollNo_id,
        Subject,
        date,
        Time,
      });

      return res
        .status(404)
        .json({ message: "Attendance record not found for given details" });
    }

    res.json({
      message: "Application approved successfully!",
      application,
      attendance,
    });
  } catch (error) {
    console.error("Error approving application:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reject Application
export const rejectApplication = async (req, res) => {
  try {
    const { rollNo_id } = req.params;

    // Find application
    const application = await ApplicationSchema.findOneAndUpdate(
      {
        rollNo_id: String(rollNo_id),
        // Subject, // ✅ use correct field name as in DB
        // Time,
        // date: { $gte: startOfDay, $lte: endOfDay },
      }, // enforce type as string
      { Status: "Reject" },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Application rejected successfully!", application });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting application", error });
  }
};

// import moment from "moment";
// import moment from "moment"; // if you prefer dayjs, use that instead

// export const rejectApplication = async (req, res) => {
//   try {
//     const { rollNo_id, Subject, Time, date } = req.body;
//     // ✅ send these fields in request body (or req.query)

//     // Normalize date to match same day (ignoring time part)
//     const startOfDay = moment(date).startOf("day").toDate();
//     const endOfDay = moment(date).endOf("day").toDate();

//     const application = await ApplicationSchema.findOneAndUpdate(
//       {
//         rollNo_id: String(rollNo_id),
//         Subject,
//         Time,
//         date: { $gte: startOfDay, $lte: endOfDay },
//       },
//       { $set: { Status: "Reject" } },
//       { new: true }
//     );

//     if (!application) {
//       return res.status(404).json({ message: "Application not found!" });
//     }

//     res.status(200).json({
//       message: "Application rejected successfully!",
//       application,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error rejecting application",
//       error: error.message,
//     });
//   }
// };
