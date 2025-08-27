import React, { useState } from "react";
import axios from "axios";

export default function FacultyRegistration() {
  const [formData, setFormData] = useState({
    fName: "",
    mName: "",
    lName: "",
    facultyId_id: "",
    email: "",
    password: "",
    department: "",
    contact: "",
    role: "",
    subject: [],
  });

  const [subjectInput, setSubjectInput] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add subject to list
  const handleAddSubject = () => {
    if (
      subjectInput.trim() &&
      !formData.subject.includes(subjectInput.trim())
    ) {
      setFormData({
        ...formData,
        subject: [...formData.subject, subjectInput.trim()],
      });
      setSubjectInput("");
    }
  };

  // Remove subject from list
  const handleRemoveSubject = (subject) => {
    setFormData({
      ...formData,
      subject: formData.subject.filter((subj) => subj !== subject),
    });
  };

  // Validate password strength
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      alert(
        "Password must have at least 8 characters, one uppercase letter, one number, and one special character."
      );
      return;
    }

    try {
      await axios.post(
        "http://localhost:7070/api/facultyRagistrations",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Faculty registered successfully!");

      setFormData({
        fName: "",
        mName: "",
        lName: "",
        facultyId_id: "",
        email: "",
        password: "",
        department: "",
        contact: "",
        role: "",
        subject: [],
      });
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      alert("❌ Error registering faculty");
    }
  };

  return (
    <div className="items-center gap-3 group">
      {/* Header with Logo */}
      {/* <div className="flex gap-3 justify-center mt-6">
        <img
          src="/Assets/DYPIMED-Logo.png"
          alt="DYPIMED Logo"
          className="w-20 h-20 animate-bounce transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          draggable={false}
        />
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 font-extrabold text-2xl md:text-3xl select-none drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]">
          DYPIMED
        </h3>
      </div> */}

      {/* Form Card */}
      <div className="min-h-screen flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-3xl bg-slate-300 rounded-3xl shadow-2xl p-8 sm:p-12 border border-slate-400 flex flex-col items-center hover:shadow-indigo-500/50 transition-shadow duration-300">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-900 mb-10 tracking-wide drop-shadow-md">
            Faculty Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 w-full" noValidate>
            {/* Faculty Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
              {/* First Name */}
              <input
                name="fName"
                type="text"
                placeholder="First Name"
                value={formData.fName}
                onChange={handleChange}
                required
                className="input-field"
              />
              {/* Middle Name */}
              <input
                name="mName"
                type="text"
                placeholder="Middle Name"
                value={formData.mName}
                onChange={handleChange}
                required
                className="input-field"
              />
              {/* Last Name */}
              <input
                name="lName"
                type="text"
                placeholder="Last Name"
                value={formData.lName}
                onChange={handleChange}
                required
                className="input-field"
              />
              {/* Faculty ID */}
              <input
                name="facultyId_id"
                type="text"
                placeholder="Faculty ID"
                value={formData.facultyId_id}
                onChange={handleChange}
                required
                className="input-field"
              />
              {/* Email */}
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
              {/* Password */}
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="input-field"
              />
              {/* Department */}
              <input
                name="department"
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
                className="input-field"
              />
              {/* Contact */}
              <input
                name="contact"
                type="number"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, ""); // only digits
                  handleChange(e);
                }}
                required
                maxLength={10}
                className="input-field"
              />
              <select
                name="role"
                id=""
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="faculty">Faculty</option>
                <option value="hod">HOD</option>
              </select>
            </div>

            {/* Subject Input */}
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Add Subject"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                className="input-field w-full"
              />
              <button
                type="button"
                onClick={handleAddSubject}
                className="px-2 py-1.5 bg-indigo-700 hover:bg-indigo-900 text-white font-bold rounded-full shadow-lg transition duration-300 transform hover:scale-105"
              >
                ➕ Add
              </button>
            </div>

            {/* Display Subjects */}
            <div className="flex flex-wrap gap-2">
              {formData.subject.map((subj, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-200 rounded-full text-indigo-900 font-semibold flex items-center gap-2"
                >
                  {subj}
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(subj)}
                    className="text-red-600 font-bold"
                  >
                    ✖
                  </button>
                </span>
              ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-indigo-700 hover:bg-indigo-900 text-white font-extrabold rounded-3xl shadow-xl transition duration-300 transform hover:scale-105 mt-10"
            >
              📝 Register Faculty
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
