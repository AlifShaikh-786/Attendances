import express from "express";
import StudentRagisterSchema from "../Model/StudentRagisterModel.js";

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
export const StdDisplay = async (req, res) => {
  try {
    const { Div, Semester, Class } = req.body;

    // 🔍 Find student matching all three fields
    const display = await StudentRagisterSchema.find({
      Class,
      Semester,
      Div,
    });

    if (!display) {
      return res.status(404).json({
        msg: "Student with provided Class, Semester, and Div not found",
      });
    }

    // ✅ Student found
    res.status(200).json(display);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
