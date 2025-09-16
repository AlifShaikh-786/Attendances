import React, { useState, useRef } from "react";
import axios from "axios";

export default function FacultyRegistrationss() {
  const formRef = useRef(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubject = () => {
    const trimmedSubject = subjectInput.trim();
    if (trimmedSubject && !formData.subject.includes(trimmedSubject)) {
      setFormData({
        ...formData,
        subject: [...formData.subject, trimmedSubject],
      });
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (subject) => {
    setFormData({
      ...formData,
      subject: formData.subject.filter((subj) => subj !== subject),
    });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      alert(
        "Password must have at least 8 characters, one uppercase letter, one number, and one special character."
      );
      return;
    }

    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
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
      alert("Faculty registered successfully!");
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
      alert("Error registering faculty");
    }
  };

  return (
    <div className=" flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Faculty Registration
        </h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="fName"
              type="text"
              placeholder="First Name"
              value={formData.fName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              name="mName"
              type="text"
              placeholder="Middle Name"
              value={formData.mName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              name="lName"
              type="text"
              placeholder="Last Name"
              value={formData.lName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              name="facultyId_id"
              type="text"
              placeholder="Faculty ID"
              value={formData.facultyId_id}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              name="department"
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              name="contact"
              type="text"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                setFormData({ ...formData, contact: numericValue });
              }}
              required
              maxLength={10}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Role</option>
              {/* <option value="admin">Admin</option> */}
              <option value="faculty">Faculty</option>
              {/* <option value="hod">HOD</option> */}
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add Subject"
              value={subjectInput}
              // required
              onChange={(e) => setSubjectInput(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 flex-1"
            />
            <button
              type="button"
              onClick={handleAddSubject}
              className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.subject.map((subj, idx) => (
              <div
                key={idx}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              >
                {subj}
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(subj)}
                  className="text-red-500 font-bold"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Register Faculty
          </button>
        </form>
      </div>
    </div>
  );
}
