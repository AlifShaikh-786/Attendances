import React, { useState, useEffect } from "react";

const Application = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    className: "",
    semester: "",
    subject: "",
    date: "",
    time: "",
    reason: "",
  });

  const [showLetter, setShowLetter] = useState(false);

  // Automatically set current date and time on component mount
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = now.toTimeString().slice(0, 5); // HH:MM
    setFormData((prev) => ({
      ...prev,
      date: formattedDate,
      time: formattedTime,
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLetter(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 bg-white shadow-lg">
        {!showLetter && (
          <form
            className="max-w-lg mx-auto space-y-4 bg-gray-50 p-6 rounded shadow-md"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
              College Attendance Letter Form
            </h1>

            <div>
              <label className="block text-gray-700">Student Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Class</label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Semester</label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                rows="3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Show Letter
            </button>
          </form>
        )}

        {/* Letter */}
        {showLetter && (
          <div className="max-w-3xl mx-auto p-10 bg-white rounded shadow-lg border-2 border-blue-300 mt-6 relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Official Attendance Letter
              </h2>
              <p className="text-gray-500 mt-1">
                Visual confirmation for college attendance
              </p>
            </div>

            <p>
              <strong>Date:</strong> {formData.date}
            </p>
            <p>
              <strong>Time:</strong> {formData.time}
            </p>

            <p className="mt-4">To Whom It May Concern,</p>

            <p className="mt-2">
              This is to certify that{" "}
              <span className="font-semibold text-blue-600">
                {formData.studentName}
              </span>{" "}
              (Roll No:{" "}
              <span className="font-semibold text-blue-600">
                {formData.rollNumber}
              </span>
              ) of class{" "}
              <span className="font-semibold text-blue-600">
                {formData.className}
              </span>
              , Semester{" "}
              <span className="font-semibold text-blue-600">
                {formData.semester}
              </span>
              , was present during the college session for the subject{" "}
              <span className="font-semibold text-blue-600">
                {formData.subject}
              </span>
              .
            </p>

            {formData.reason && (
              <p className="mt-2 italic text-gray-500">
                Reason: {formData.reason}
              </p>
            )}

            <p className="mt-6">Sincerely,</p>
            <p className="font-bold mt-2">
              Admin / College Attendance Department
            </p>

            <button
              onClick={() => setShowLetter(false)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Form
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Application;
