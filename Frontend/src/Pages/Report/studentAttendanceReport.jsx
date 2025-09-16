import React, { useState } from "react";

export default function StudentAttendanceReport() {
  const [formdata, setFormData] = useState({
    semester: "",
    Subject: "",
    date: "",
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [subjectPercentages, setSubjectPercentages] = useState({});

  // ✅ Get roll number safely from localStorage
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo") || "{}");
  const roll = studentInfo?.rollNo || studentInfo?.rollNo_id || null;

  console.log("Roll Number:", roll);

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const resetData = () => {
    setStudents([]);
    setOverallPercentage(0);
    setSubjectPercentages({});
  };

  const StdDetailSubmit = async (e) => {
    e.preventDefault();

    if (!roll) {
      alert("Roll number not found. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:7070/api/AttendanceReports",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rollNo_id: roll, // ✅ send roll number
            semester: formdata.semester || undefined,
            Subject: formdata.Subject || undefined,
            date: formdata.date || undefined,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        alert("Error: " + (data?.msg || "Unknown error"));
        resetData();
        return;
      }

      if (!Array.isArray(data) || data.length === 0) {
        alert("No records found for your attendance.");
        resetData();
        return;
      }

      setStudents(data);

      // ✅ Calculate overall percentage
      const totalRecords = data.length;
      const presentCount = data.filter(
        (s) => s.status?.toLowerCase() === "present"
      ).length;
      setOverallPercentage(((presentCount / totalRecords) * 100).toFixed(2));

      // ✅ Calculate subject-wise percentages
      const subjMap = {};
      data.forEach((s) => {
        if (!s.Subject) return;
        if (!subjMap[s.Subject]) subjMap[s.Subject] = { total: 0, present: 0 };
        subjMap[s.Subject].total += 1;
        if (s.status?.toLowerCase() === "present")
          subjMap[s.Subject].present += 1;
      });

      const subjPercent = {};
      Object.keys(subjMap).forEach((subj) => {
        subjPercent[subj] = (
          (subjMap[subj].present / subjMap[subj].total) *
          100
        ).toFixed(2);
      });

      setSubjectPercentages(subjPercent);
    } catch (error) {
      alert("Server error: " + error.message);
      resetData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6  min-h-screen flex-col">
      {/* Header */}
      {/* <div className="flex gap-3 justify-center mt-6">
        <img
          src="/Assets/DYPIMED-Logo.png"
          alt="DYPIMED Logo"
          className="w-20 h-20 animate-bounce transition-transform duration-300"
          loading="lazy"
          draggable={false}
        />
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 font-extrabold text-2xl md:text-3xl">
          DYPIMED
        </h3>
      </div> */}

      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg m-4">
          📊 Attendance Reports
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={StdDetailSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-lg max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <select
            name="semester"
            value={formdata.semester}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Semester --</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>

          <input
            type="text"
            placeholder="Subject"
            name="Subject"
            value={formdata.Subject}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="date"
            value={formdata.date}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
        >
          {loading ? "Loading..." : "🚀 Load Attendance"}
        </button>
      </form>

      {/* Attendance Percentages */}
      {students.length > 0 && (
        <div className="max-w-5xl mx-auto mt-6 p-4 bg-white rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-indigo-800 mb-2">
            📈 Attendance Percentage
          </h2>
          <p>
            <strong>Overall:</strong> {overallPercentage}%
          </p>
          <div className="mt-2">
            <strong>Subject-wise:</strong>
            <ul className="list-disc ml-5">
              {Object.keys(subjectPercentages).map((subj, idx) => (
                <li key={idx}>
                  {subj}: {subjectPercentages[subj]}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Table */}
      {students.length > 0 && (
        <div className="overflow-x-auto mt-6 shadow-lg rounded-xl max-w-5xl mx-auto bg-gray-300">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <th className="px-4 py-2">Roll No</th>
                <th className="px-4 py-2">First</th>
                <th className="px-4 py-2">Middal</th>
                <th className="px-4 py-2">Last</th>

                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Semester</th>
                <th className="px-4 py-2">Division</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr
                  key={student._id || i}
                  className={`hover:bg-blue-50 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="border px-4 py-2">
                    {student.rollNo || student.rollNo_id || "-"}
                  </td>
                  <td className="border px-4 py-2">{student.fName || "-"}</td>
                  <td className="border px-4 py-2">{student.mName || "-"}</td>
                  <td className="border px-4 py-2">{student.lName || "-"}</td>
                  <td className="border px-4 py-2">{student.Class || "-"}</td>
                  <td className="border px-4 py-2">
                    {student.semester || "-"}
                  </td>
                  <td className="border px-4 py-2">{student.div || "-"}</td>
                  <td className="border px-4 py-2">{student.Subject || "-"}</td>
                  <td className="border px-4 py-2">{student.Time || "-"}</td>
                  <td className="border px-4 py-2">
                    {student.date
                      ? new Date(student.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="border px-4 py-2">{student.status || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
