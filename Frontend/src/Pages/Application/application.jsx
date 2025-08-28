import axios from "axios";
import React, { useState, useEffect } from "react";

const Application = () => {
  const [formData, setFormData] = useState({
    rollNo_id: "",
    fName: "",
    mName: "",
    lName: "",
    batch: "",
    Class: "",
    semester: "",
    div: "",
    email: "",
    contact: "",
    Subject: "",
    reason: "",
    date: "",
    Time: "",
  });

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("studentInfo"));
      if (storedUser) {
        setFormData((prev) => ({ ...prev, ...storedUser }));
        console.log("Loaded user from localStorage:", storedUser);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:7070/api/ApplayApplication-s",
        formData
      );
      alert("✅ Application submitted successfully");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to submit application");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <form
        className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl space-y-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          College Attendance Letter Form
        </h1>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">First Name</label>
            <input
              type="text"
              name="fName"
              placeholder="First Name"
              value={formData.fName}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">
              Middle Name
            </label>
            <input
              type="text"
              name="mName"
              placeholder="Middle Name"
              value={formData.mName}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Last Name</label>
            <input
              type="text"
              name="lName"
              placeholder="Last Name"
              value={formData.lName}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
        </div>

        {/* Roll No  and Batch*/}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">
              Roll Number
            </label>
            <input
              type="text"
              name="rollNo_id"
              placeholder="Roll Number"
              value={formData.rollNo_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Batch</label>
            <input
              type="text"
              name="batch"
              placeholder="Batch"
              value={formData.batch}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
        </div>
        {/* Class, Semester, Division */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Class</label>
            <input
              type="text"
              name="Class"
              placeholder="Class"
              value={formData.Class}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Semester</label>
            <input
              type="text"
              name="semester"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Division</label>
            <input
              type="text"
              name="div"
              placeholder="Division"
              value={formData.div}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
        </div>

        {/* Email & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Contact</label>
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Subject</label>
          <input
            type="text"
            name="Subject"
            placeholder="Enter Subject"
            value={formData.Subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            required
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Time</label>
            <input
              type="time"
              name="Time"
              value={formData.Time}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
        </div>

        {/* Reason */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">
            Reason (Optional)
          </label>
          <textarea
            name="reason"
            placeholder="Reason for attendance"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Application;
