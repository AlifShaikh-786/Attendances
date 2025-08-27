// import React, { useState } from "react";

// export default function AttendanceForm() {
//   const [formdata, setFormData] = useState({
//     Class: "",
//     semester: "",
//     div: "",
//     Subject: "",
//     rollNo: "",
//     date: "",
//     status: "",
//   });

//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formdata,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Load students from backend
//   const StdDetailSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const requestBody = {};

//       // Only add keys that have values
//       for (const key in formdata) {
//         if (formdata[key] && formdata[key].trim() !== "") {
//           requestBody[key] = formdata[key];
//         }
//       }

//       const response = await fetch(
//         "http://localhost:7070/api/AttendanceReports",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         if (Array.isArray(data) && data.length > 0) {
//           setStudents(data);
//         } else {
//           alert("No students found for the given criteria.");
//           setStudents([]);
//         }
//       } else {
//         alert("Error: " + (data?.msg || "Unknown error"));
//         setStudents([]);
//       }
//     } catch (error) {
//       alert("Server error: " + error.message);
//       setStudents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen flex-col">
//       {/* Header */}
//       <div className="flex justify-center items-center">
//         <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg m-4 mb-10">
//           📊 Attendance Reports
//         </h1>
//       </div>

//       {/* Form Container */}
//       <form
//         onSubmit={StdDetailSubmit}
//         className="space-y-4 bg-white p-6 rounded-2xl shadow-lg max-w-5xl mx-auto"
//       >
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           <select
//             name="Class"
//             value={formdata.Class}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">-- Select Class --</option>
//             <option value="MCA-II">MCA-II</option>
//             <option value="MCA-I">MCA-I</option>
//           </select>

//           <select
//             name="semester"
//             value={formdata.semester}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">-- Select Semester --</option>
//             <option value="I">I</option>
//             <option value="II">II</option>
//             <option value="III">III</option>
//             <option value="IV">IV</option>
//           </select>

//           <select
//             name="div"
//             value={formdata.div}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">-- Select Division --</option>
//             <option value="A">A</option>
//             <option value="B">B</option>
//           </select>

//           <input
//             type="text"
//             placeholder="Subject"
//             name="Subject"
//             value={formdata.Subject}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             placeholder="Roll No (optional)"
//             name="rollNo"
//             value={formdata.rollNo}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="status"
//             name="status"
//             value={formdata.status}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="date"
//             name="date"
//             value={formdata.date}
//             onChange={handleChange}
//             max={new Date().toISOString().split("T")[0]}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition transform hover:scale-[1.02]"
//         >
//           {loading ? "Loading..." : "🚀 Load Students"}
//         </button>
//       </form>

//       {/* Table */}
//       {students.length > 0 && (
//         <div className="overflow-x-auto mt-6 shadow-lg rounded-xl">
//           <table className="w-full border-collapse bg-white">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//                 <th className="px-4 py-2">Roll No</th>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Class</th>
//                 <th className="px-4 py-2">Semester</th>
//                 <th className="px-4 py-2">Division</th>
//                 <th className="px-4 py-2">Subject</th>
//                 <th className="px-4 py-2">Time</th>
//                 <th className="px-4 py-2">Date</th>
//                 <th className="px-4 py-2">Status</th>
//                 {/* <th className="px-4 py-2">Image</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student, i) => (
//                 <tr
//                   key={student._id}
//                   className={`hover:bg-blue-50 ${
//                     i % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   }`}
//                 >
//                   <td className="border px-4 py-2">{student.rollNo}</td>
//                   <td className="border px-4 py-2">{student.stdName}</td>
//                   <td className="border px-4 py-2">{student.Class}</td>
//                   <td className="border px-4 py-2">{student.semester}</td>
//                   <td className="border px-4 py-2">{student.div}</td>
//                   <td className="border px-4 py-2">{student.Subject}</td>
//                   <td className="border px-4 py-2">{student.Time || "-"}</td>
//                   <td className="border px-4 py-2">
//                     {student.date
//                       ? new Date(student.date).toLocaleDateString()
//                       : "-"}
//                   </td>
//                   <td className="border px-4 py-2">{student.status || "-"}</td>
//                   {/* <td className="border px-4 py-2">
//                     {student.image?.length > 0 ? (
//                       <img
//                         src={student.image[0]}
//                         alt="Student"
//                         className="w-12 h-12 object-cover rounded-lg shadow"
//                       />
//                     ) : (
//                       "-"
//                     )}
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Download Buttons */}
//       <div className="flex justify-center gap-6 mt-8">
//         <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105">
//           Download Excel
//         </button>
//         <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105">
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function AttendanceForm() {
  const [formData, setFormData] = useState({
    Class: "",
    semester: "",
    div: "",
    Subject: "",
    rollNo_id: "",
    date: "",
    status: "",
  });

  const [students, setStudents] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [subjectPercentages, setSubjectPercentages] = useState({});

  // Handle input changes for search form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Load students from backend
  const StdDetailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestBody = {};

      for (const key in formData) {
        if (formData[key] && formData[key].trim() !== "") {
          requestBody[key] = formData[key];
        }
      }

      const response = await fetch(
        "http://localhost:7070/api/AttendanceReports",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (Array.isArray(data) && data.length > 0) {
          setStudents(data);

          // Calculate overall attendance %
          const totalRecords = data.length;
          const presentCount = data.filter(
            (s) => s.status.toLowerCase() === "present"
          ).length;
          setOverallPercentage(
            ((presentCount / totalRecords) * 100).toFixed(2)
          );

          // Calculate subject-wise %
          const subjMap = {};
          data.forEach((s) => {
            if (!subjMap[s.Subject])
              subjMap[s.Subject] = { total: 0, present: 0 };
            subjMap[s.Subject].total += 1;
            if (s.status.toLowerCase() === "present")
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
        } else {
          alert("No students found for the given criteria.");
          setStudents([]);
          setOverallPercentage(0);
          setSubjectPercentages({});
        }
      } else {
        alert("Error: " + (data?.msg || "Unknown error"));
        setStudents([]);
        setOverallPercentage(0);
        setSubjectPercentages({});
      }
    } catch (error) {
      alert("Server error: " + error.message);
      setStudents([]);
      setOverallPercentage(0);
      setSubjectPercentages({});
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (id) => {
    setEditRowId(id);
    const student = students.find((s) => s._id === id);
    setEditData({ ...student });
  };

  // Handle input change in edit mode
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes
  const handleSave = async (id) => {
    try {
      await axios.put(
        `http://localhost:7070/api/Update-Attendancess/${id}`,
        editData
      );
      setStudents((prev) =>
        prev.map((s) => (s._id === id ? { ...editData } : s))
      );
      setEditRowId(null);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditRowId(null);
    setEditData({});
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          📊 Attendance Reports
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={StdDetailSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-lg max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* <select
            name="Class"
            value={formData.Class}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Class --</option>
            <option value="MCA-II">MCA-II</option>
            <option value="MCA-I">MCA-I</option>
          </select>

          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Semester --</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>

          <select
            name="div"
            value={formData.div}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Division --</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select> */}

          <input
            type="text"
            placeholder="Subject"
            name="Subject"
            value={formData.Subject}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Roll No (optional)"
            name="rollNo_id"
            value={formData.rollNo_id}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />

          {/* <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105"
        >
          {loading ? "Loading..." : "🚀 Load Students"}
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
        <div className="overflow-x-auto mt-6 shadow-lg rounded-xl max-w-5xl mx-auto">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <th className="px-4 py-2">Roll No</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Middle Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Semester</th>
                <th className="px-4 py-2">Division</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr
                  key={student._id}
                  className={`hover:bg-blue-50 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="border px-4 py-2">{student.rollNo_id}</td>

                  {[
                    "fName",
                    "mName",
                    "lName",
                    "Class",
                    "semester",
                    "div",
                    "Subject",
                    "Time",
                    "date",
                  ].map((field) => (
                    <td key={field} className="border px-4 py-2">
                      {editRowId === student._id ? (
                        <input
                          type="text"
                          name={field}
                          value={editData[field] || ""}
                          onChange={handleEditChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : field === "date" && student.date ? (
                        new Date(student.date).toLocaleDateString()
                      ) : (
                        student[field] || "-"
                      )}
                    </td>
                  ))}
                  {/* Status Field with Dropdown in Edit Mode */}
                  <td className="border px-4 py-2">
                    {editRowId === student._id ? (
                      <select
                        name="status"
                        value={editData.status || ""}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        {/* <option value="Leave">Leave</option>
                        <option value="Late">Late</option> */}
                      </select>
                    ) : (
                      student.status || "-"
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="border px-4 py-2">
                    {editRowId === student._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(student._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(student._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
