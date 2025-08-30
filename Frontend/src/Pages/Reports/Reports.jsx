// import React, { useState } from "react";

// export default function AttendanceForm() {
//   const [formdata, setFormData] = useState({
//     Class: "",
//     semester: "",
//     div: "",
//     Subject: "",
//     rollNo_id: "",
//     date: "",
//     status: "",
//     batch: "",
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
//             name="batch"
//             value={formdata.batch}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">-- Select batch --</option>
//             <option value="2024-2026">2024-2026</option>
//             <option value="MCA-I">MCA-I</option>
//           </select>
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
//                 <th className="px-4 py-2">First Name</th>
//                 <th className="px-4 py-2">Middal Name</th>
//                 <th className="px-4 py-2">Last Name</th>
//                 <th className="px-4 py-2">Class</th>
//                 <th className="px-4 py-2">Semester</th>
//                 <th className="px-4 py-2">Division</th>
//                 <th className="px-4 py-2">Subject</th>
//                 <th className="px-4 py-2">Faculty Id</th>
//                 <th className="px-4 py-2">Department</th>
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
//                   <td className="border px-4 py-2">{student.rollNo_id}</td>
//                   <td className="border px-4 py-2">{student.fName}</td>
//                   <td className="border px-4 py-2">{student.mName}</td>
//                   <td className="border px-4 py-2">{student.lName}</td>
//                   <td className="border px-4 py-2">{student.Class}</td>
//                   <td className="border px-4 py-2">{student.semester}</td>
//                   <td className="border px-4 py-2">{student.div}</td>
//                   <td className="border px-4 py-2">{student.Subject}</td>
//                   <td className="border px-4 py-2">{student.facultyId_id}</td>
//                   <td className="border px-4 py-2">{student.department}</td>

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
// ==============================================================================================================================
// import React, { useState } from "react";

// export default function AttendanceForm() {
//   const [formdata, setFormData] = useState({
//     Class: "",
//     semester: "",
//     div: "",
//     Subject: "",
//     rollNo_id: "",
//     date: "",
//     startDate: "",
//     endDate: "",
//     status: "",
//     batch: "",
//     facultyId_id: "",
//   });

//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activeFilter, setActiveFilter] = useState(""); // for quick filters

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formdata,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Quick Filters
//   const applyQuickFilter = (type) => {
//     const today = new Date();
//     let start = "";
//     let end = new Date().toISOString().split("T")[0];

//     if (type === "daily") {
//       start = end;
//     } else if (type === "weekly") {
//       const d = new Date();
//       d.setDate(today.getDate() - 7);
//       start = d.toISOString().split("T")[0];
//     } else if (type === "monthly") {
//       const d = new Date();
//       d.setMonth(today.getMonth() - 1);
//       start = d.toISOString().split("T")[0];
//     } else if (type === "semester") {
//       // Assuming semester = 6 months range
//       const d = new Date();
//       d.setMonth(today.getMonth() - 6);
//       start = d.toISOString().split("T")[0];
//     }

//     setFormData({
//       ...formdata,
//       startDate: start,
//       endDate: end,
//     });

//     setActiveFilter(type);
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
//           alert("No records found for the given criteria.");
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
//     <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="flex justify-center items-center">
//         <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg m-4 mb-6">
//           📊 Advanced Attendance Reports
//         </h1>
//       </div>

//       {/* Form Container */}
//       <form
//         onSubmit={StdDetailSubmit}
//         className="space-y-4 bg-white p-6 rounded-2xl shadow-lg max-w-6xl mx-auto"
//       >
//         {/* Filter Inputs */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           <select
//             name="batch"
//             value={formdata.batch}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">-- Select Batch --</option>
//             <option value="2024-2026">2024-2026</option>
//             <option value="MCA-I">MCA-I</option>
//           </select>

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
//             placeholder="Roll No"
//             name="rollNo_id"
//             value={formdata.rollNo_id}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             placeholder="Faculty ID"
//             name="facultyId_id"
//             value={formdata.facultyId_id}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             placeholder="Status"
//             name="status"
//             value={formdata.status}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Date Filters */}
//           <input
//             type="date"
//             name="startDate"
//             value={formdata.startDate}
//             onChange={handleChange}
//             max={new Date().toISOString().split("T")[0]}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="date"
//             name="endDate"
//             value={formdata.endDate}
//             onChange={handleChange}
//             max={new Date().toISOString().split("T")[0]}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Quick Filters */}
//         <div className="flex flex-wrap gap-3 justify-center mt-4">
//           {["daily", "weekly", "monthly", "semester"].map((filter) => (
//             <button
//               type="button"
//               key={filter}
//               onClick={() => applyQuickFilter(filter)}
//               className={`px-4 py-2 rounded-lg text-white shadow-md transition transform hover:scale-105 ${
//                 activeFilter === filter
//                   ? "bg-blue-700"
//                   : "bg-gradient-to-r from-blue-500 to-purple-500"
//               }`}
//             >
//               {filter.charAt(0).toUpperCase() + filter.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition transform hover:scale-[1.02] mt-4"
//         >
//           {loading ? "Loading..." : "🚀 Generate Report"}
//         </button>
//       </form>

//       {/* Table */}
//       {students.length > 0 && (
//         <div className="overflow-x-auto mt-6 shadow-lg rounded-xl bg-white">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//                 {[
//                   "Roll No",
//                   "First Name",
//                   "Middle Name",
//                   "Last Name",
//                   "Class",
//                   "Semester",
//                   "Division",
//                   "Subject",
//                   "Faculty Id",
//                   "Department",
//                   "Time",
//                   "Date",
//                   "Status",
//                 ].map((heading, idx) => (
//                   <th key={idx} className="px-4 py-2 text-left">
//                     {heading}
//                   </th>
//                 ))}
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
//                   <td className="border px-4 py-2">{student.rollNo_id}</td>
//                   <td className="border px-4 py-2">{student.fName}</td>
//                   <td className="border px-4 py-2">{student.mName}</td>
//                   <td className="border px-4 py-2">{student.lName}</td>
//                   <td className="border px-4 py-2">{student.Class}</td>
//                   <td className="border px-4 py-2">{student.semester}</td>
//                   <td className="border px-4 py-2">{student.div}</td>
//                   <td className="border px-4 py-2">{student.Subject}</td>
//                   <td className="border px-4 py-2">{student.facultyId_id}</td>
//                   <td className="border px-4 py-2">{student.department}</td>
//                   <td className="border px-4 py-2">{student.Time || "-"}</td>
//                   <td className="border px-4 py-2">
//                     {student.date
//                       ? new Date(student.date).toLocaleDateString()
//                       : "-"}
//                   </td>
//                   <td className="border px-4 py-2">{student.status || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Download Buttons */}
//       {students.length > 0 && (
//         <div className="flex justify-center gap-6 mt-8">
//           <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105">
//             Download Excel
//           </button>
//           <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105">
//             Download PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// ===================================================================================================================

// import React, { useState, useMemo } from "react";
// import axios from "axios";

// export default function AttendanceForm() {
//   // helper: local YYYY-MM-DD string (avoids UTC shift)
//   const toLocalDateStr = (d) => {
//     const tz = d.getTimezoneOffset() * 60000;
//     return new Date(d.getTime() - tz).toISOString().slice(0, 10);
//   };
//   const todayStr = useMemo(() => toLocalDateStr(new Date()), []);

//   const [formdata, setFormData] = useState({
//     Class: "",
//     semester: "",
//     div: "",
//     Subject: "",
//     rollNo_id: "",
//     startDate: "",
//     endDate: "",
//     status: "",
//     batch: "",
//     facultyId_id: "",
//   });

//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activeFilter, setActiveFilter] = useState("");
//   const [error, setError] = useState("");

//   // Handle generic input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Handle date specially to keep them consistent
//     if (name === "startDate" || name === "endDate") {
//       setFormData((prev) => {
//         let next = { ...prev, [name]: value };
//         const start = next.startDate ? new Date(next.startDate) : null;
//         const end = next.endDate ? new Date(next.endDate) : null;

//         if (start && end && start > end) {
//           if (name === "startDate") next.endDate = value;
//           else next.startDate = value;
//         }
//         return next;
//       });
//       setActiveFilter("");
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Quick Filters
//   const applyQuickFilter = (type) => {
//     const today = new Date();
//     const end = toLocalDateStr(today);
//     let start = end;

//     if (type === "weekly") {
//       const d = new Date(today);
//       d.setDate(d.getDate() - 7);
//       start = toLocalDateStr(d);
//     } else if (type === "monthly") {
//       const d = new Date(today);
//       d.setMonth(d.getMonth() - 1);
//       start = toLocalDateStr(d);
//     } else if (type === "semester") {
//       const d = new Date(today);
//       d.setMonth(d.getMonth() - 6);
//       start = toLocalDateStr(d);
//     }

//     setFormData((prev) => ({ ...prev, startDate: start, endDate: end }));
//     setActiveFilter(type);
//   };

//   // Fetch & Filter
//   const StdDetailSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.get(
//         "http://localhost:7070/api/AttendanceReports"
//       );

//       if (res.data.success) {
//         let filtered = res.data.reports;

//         // Apply frontend filters
//         if (formdata.Class) {
//           filtered = filtered.filter((r) => r.Class === formdata.Class);
//         }
//         if (formdata.semester) {
//           filtered = filtered.filter((r) => r.semester === formdata.semester);
//         }
//         if (formdata.div) {
//           filtered = filtered.filter((r) => r.div === formdata.div);
//         }
//         if (formdata.batch) {
//           filtered = filtered.filter((r) => r.batch === formdata.batch);
//         }
//         if (formdata.Subject) {
//           filtered = filtered.filter((r) => r.Subject === formdata.Subject);
//         }
//         if (formdata.facultyId_id) {
//           filtered = filtered.filter(
//             (r) => r.facultyId_id === formdata.facultyId_id
//           );
//         }
//         if (formdata.rollNo_id) {
//           filtered = filtered.filter((r) => r.rollNo_id === formdata.rollNo_id);
//         }
//         if (formdata.status) {
//           filtered = filtered.filter((r) => r.status === formdata.status);
//         }
//         if (formdata.startDate && formdata.endDate) {
//           const start = new Date(formdata.startDate);
//           const end = new Date(formdata.endDate);
//           filtered = filtered.filter((r) => {
//             const d = new Date(r.date);
//             return d >= start && d <= end;
//           });
//         }

//         setStudents(filtered);
//       } else {
//         setStudents([]);
//         setError("No records found");
//       }
//     } catch (err) {
//       console.error("❌ Error fetching reports:", err);
//       setError("Something went wrong while fetching reports");
//       setStudents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="flex justify-center items-center">
//         <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg m-4 mb-6">
//           📊 Advanced Attendance Reports
//         </h1>
//       </div>

//       {/* Form */}
//       <form
//         onSubmit={StdDetailSubmit}
//         className="space-y-4 bg-white p-6 rounded-2xl shadow-lg max-w-6xl mx-auto"
//       >
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           <select
//             name="batch"
//             value={formdata.batch}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">-- Select Batch --</option>
//             <option value="2024-2026">2024-2026</option>
//             <option value="MCA-I">MCA-I</option>
//           </select>

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
//             placeholder="Roll No"
//             name="rollNo_id"
//             value={formdata.rollNo_id}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             placeholder="Faculty ID"
//             name="facultyId_id"
//             value={formdata.facultyId_id}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             placeholder="Status"
//             name="status"
//             value={formdata.status}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="date"
//             name="startDate"
//             value={formdata.startDate}
//             onChange={handleChange}
//             max={formdata.endDate || todayStr}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="date"
//             name="endDate"
//             value={formdata.endDate}
//             onChange={handleChange}
//             min={formdata.startDate || ""}
//             max={todayStr}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Quick Filters */}
//         <div className="flex flex-wrap gap-3 justify-center mt-4">
//           {["daily", "weekly", "monthly", "semester"].map((filter) => (
//             <button
//               type="button"
//               key={filter}
//               onClick={() => applyQuickFilter(filter)}
//               className={`px-4 py-2 rounded-lg text-white shadow-md transition transform hover:scale-105 ${
//                 activeFilter === filter
//                   ? "bg-blue-700"
//                   : "bg-gradient-to-r from-blue-500 to-purple-500"
//               }`}
//             >
//               {filter.charAt(0).toUpperCase() + filter.slice(1)}
//             </button>
//           ))}
//           <button
//             type="button"
//             onClick={() => {
//               setFormData((p) => ({ ...p, startDate: "", endDate: "" }));
//               setActiveFilter("");
//             }}
//             className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 shadow transition"
//           >
//             Clear Dates
//           </button>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition transform hover:scale-[1.02] mt-4 disabled:opacity-50"
//         >
//           {loading ? "⏳ Loading..." : "🚀 Generate Report"}
//         </button>
//       </form>

//       {/* Error */}
//       {error && (
//         <div className="mt-4 text-center text-red-600 font-semibold">
//           {error}
//         </div>
//       )}

//       {/* Table */}
//       {students.length > 0 && (
//         <div className="overflow-x-auto mt-6 shadow-lg rounded-xl bg-white">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//                 {[
//                   "Roll No",
//                   "First Name",
//                   "Middle Name",
//                   "Last Name",
//                   "Class",
//                   "Semester",
//                   "Division",
//                   "Subject",
//                   "Faculty Id",
//                   "Department",
//                   "Time",
//                   "Date",
//                   "Status",
//                 ].map((heading, idx) => (
//                   <th key={idx} className="px-4 py-2 text-left">
//                     {heading}
//                   </th>
//                 ))}
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
//                   <td className="border px-4 py-2">{student.rollNo_id}</td>
//                   <td className="border px-4 py-2">{student.fName}</td>
//                   <td className="border px-4 py-2">{student.mName}</td>
//                   <td className="border px-4 py-2">{student.lName}</td>
//                   <td className="border px-4 py-2">{student.Class}</td>
//                   <td className="border px-4 py-2">{student.semester}</td>
//                   <td className="border px-4 py-2">{student.div}</td>
//                   <td className="border px-4 py-2">{student.Subject}</td>
//                   <td className="border px-4 py-2">{student.facultyId_id}</td>
//                   <td className="border px-4 py-2">{student.department}</td>
//                   <td className="border px-4 py-2">{student.Time || "-"}</td>
//                   <td className="border px-4 py-2">
//                     {student.date
//                       ? new Date(student.date).toLocaleDateString()
//                       : "-"}
//                   </td>
//                   <td className="border px-4 py-2">{student.status || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// =====================================================================================

// import React, { useState, useMemo } from "react";
// import axios from "axios";

// export default function AttendanceForm() {
//   // helper: local YYYY-MM-DD string (avoids UTC shift)
//   const toLocalDateStr = (d) => {
//     const tz = d.getTimezoneOffset() * 60000;
//     return new Date(d.getTime() - tz).toISOString().slice(0, 10);
//   };
//   const todayStr = useMemo(() => toLocalDateStr(new Date()), []);

//   const [formdata, setFormData] = useState({
//     Class: "",
//     semester: "",
//     div: "",
//     Subject: "",
//     rollNo_id: "",
//     startDate: "",
//     endDate: "",
//     status: "",
//     batch: "",
//     facultyId_id: "",
//   });

//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [studentPercentages, setStudentPercentages] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("");
//   const [error, setError] = useState("");

//   // Handle generic input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Handle date specially to keep them consistent
//     if (name === "startDate" || name === "endDate") {
//       setFormData((prev) => {
//         let next = { ...prev, [name]: value };
//         const start = next.startDate ? new Date(next.startDate) : null;
//         const end = next.endDate ? new Date(next.endDate) : null;

//         if (start && end && start > end) {
//           if (name === "startDate") next.endDate = value;
//           else next.startDate = value;
//         }
//         return next;
//       });
//       setActiveFilter("");
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Quick Filters
//   const applyQuickFilter = (type) => {
//     const today = new Date();
//     const end = toLocalDateStr(today);
//     let start = end;

//     if (type === "weekly") {
//       const d = new Date(today);
//       d.setDate(d.getDate() - 7);
//       start = toLocalDateStr(d);
//     } else if (type === "monthly") {
//       const d = new Date(today);
//       d.setMonth(d.getMonth() - 1);
//       start = toLocalDateStr(d);
//     } else if (type === "semester") {
//       const d = new Date(today);
//       d.setMonth(d.getMonth() - 6);
//       start = toLocalDateStr(d);
//     }

//     setFormData((prev) => ({ ...prev, startDate: start, endDate: end }));
//     setActiveFilter(type);
//   };

//   // Fetch & Filter
//   const StdDetailSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.get(
//         "http://localhost:7070/api/AttendanceReports"
//       );

//       if (res.data.success) {
//         let filtered = res.data.reports;

//         // Apply frontend filters
//         if (formdata.Class) {
//           filtered = filtered.filter((r) => r.Class === formdata.Class);
//         }
//         if (formdata.semester) {
//           filtered = filtered.filter((r) => r.semester === formdata.semester);
//         }
//         if (formdata.div) {
//           filtered = filtered.filter((r) => r.div === formdata.div);
//         }
//         if (formdata.batch) {
//           filtered = filtered.filter((r) => r.batch === formdata.batch);
//         }
//         if (formdata.Subject) {
//           filtered = filtered.filter((r) => r.Subject === formdata.Subject);
//         }
//         if (formdata.facultyId_id) {
//           filtered = filtered.filter(
//             (r) => r.facultyId_id === formdata.facultyId_id
//           );
//         }
//         if (formdata.rollNo_id) {
//           filtered = filtered.filter((r) => r.rollNo_id === formdata.rollNo_id);
//         }
//         if (formdata.status) {
//           filtered = filtered.filter((r) => r.status === formdata.status);
//         }
//         if (formdata.startDate && formdata.endDate) {
//           const start = new Date(formdata.startDate);
//           const end = new Date(formdata.endDate);
//           filtered = filtered.filter((r) => {
//             const d = new Date(r.date);
//             return d >= start && d <= end;
//           });
//         }

//         setStudents(filtered);
//         const percentages = calculatePercentages(filtered);
//         setStudentPercentages(percentages);
//       } else {
//         setStudents([]);
//         setError("No records found");
//       }
//     } catch (err) {
//       console.error("❌ Error fetching reports:", err);
//       setError("Something went wrong while fetching reports");
//       setStudents([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const calculatePercentages = (attendanceRecords) => {
//     const studentStats = {};

//     attendanceRecords.forEach((rec) => {
//       const roll = rec.rollNo_id || "Unknown";

//       if (!studentStats[roll]) {
//         studentStats[roll] = {
//           fName: rec.fName,
//           mName: rec.mName,
//           lName: rec.lName,
//           rollNo_id: roll,
//           total: 0,
//           present: 0,
//           absent: 0,
//         };
//       }

//       studentStats[roll].total += 1;
//       if (rec.status === "Present") {
//         studentStats[roll].present += 1;
//       } else {
//         studentStats[roll].absent += 1;
//       }
//     });

//     // convert to array with percentage
//     return Object.values(studentStats).map((s) => ({
//       ...s,
//       percentage: ((s.present / s.total) * 100).toFixed(2),
//     }));
//   };

//   const calculateOverallStats = (studentPercentagess) => {
//     const totalStudents = studentPercentagess.length;

//     const presentCount = studentPercentagess.filter(
//       (s) => s.present > 0
//     ).length;

//     const absentCount = studentPercentagess.filter((s) => s.absent > 0).length;

//     return { totalStudents, presentCount, absentCount };
//   };
//   const studentPercentagess = calculatePercentages(attendanceRecords);
//   const overallStats = calculateOverallStats(studentPercentages);

//   // return (
//   //   <div>
//   //     {/* Table */}
//   //     <table className="w-full border-collapse border border-gray-400 mt-4">
//   //       {/* ...same table code as before... */}
//   //     </table>

//   //     {/* Overall Stats */}
//   //     <div className="mt-4 p-4 bg-gray-100 rounded-md shadow">
//   //       <p><strong>Total Students:</strong> {overallStats.totalStudents}</p>
//   //       <p className="text-green-600">
//   //         <strong>Students with Present:</strong> {overallStats.presentCount}
//   //       </p>
//   //       <p className="text-red-600">
//   //         <strong>Students with Absent:</strong> {overallStats.absentCount}
//   //       </p>
//   //     </div>
//   //   </div>
//   // );

//   return (
//     <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="flex justify-center items-center">
//         <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg m-4 mb-6">
//           📊 Advanced Attendance Reports
//         </h1>
//       </div>

//       {/* Form */}
//       <form
//         onSubmit={StdDetailSubmit}
//         className="space-y-4 bg-white p-6 rounded-2xl shadow-lg max-w-6xl mx-auto"
//       >
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           <select
//             name="batch"
//             value={formdata.batch}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">-- Select Batch --</option>
//             <option value="2024-2026">2024-2026</option>
//             <option value="MCA-I">MCA-I</option>
//           </select>

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
//             placeholder="Roll No"
//             name="rollNo_id"
//             value={formdata.rollNo_id}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             placeholder="Faculty ID"
//             name="facultyId_id"
//             value={formdata.facultyId_id}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             placeholder="Status"
//             name="status"
//             value={formdata.status}
//             onChange={handleChange}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="date"
//             name="startDate"
//             value={formdata.startDate}
//             onChange={handleChange}
//             max={formdata.endDate || todayStr}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="date"
//             name="endDate"
//             value={formdata.endDate}
//             onChange={handleChange}
//             min={formdata.startDate || ""}
//             max={todayStr}
//             className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Quick Filters */}
//         <div className="flex flex-wrap gap-3 justify-center mt-4">
//           {["daily", "weekly", "monthly", "semester"].map((filter) => (
//             <button
//               type="button"
//               key={filter}
//               onClick={() => applyQuickFilter(filter)}
//               className={`px-4 py-2 rounded-lg text-white shadow-md transition transform hover:scale-105 ${
//                 activeFilter === filter
//                   ? "bg-blue-700"
//                   : "bg-gradient-to-r from-blue-500 to-purple-500"
//               }`}
//             >
//               {filter.charAt(0).toUpperCase() + filter.slice(1)}
//             </button>
//           ))}
//           <button
//             type="button"
//             onClick={() => {
//               setFormData((p) => ({ ...p, startDate: "", endDate: "" }));
//               setActiveFilter("");
//             }}
//             className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 shadow transition"
//           >
//             Clear Dates
//           </button>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition transform hover:scale-[1.02] mt-4 disabled:opacity-50"
//         >
//           {loading ? "⏳ Loading..." : "🚀 Generate Report"}
//         </button>
//       </form>

//       {/* Error */}
//       {error && (
//         <div className="mt-4 text-center text-red-600 font-semibold">
//           {error}
//         </div>
//       )}
//       <table className="w-full border-collapse border border-gray-400 mt-4">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-4 py-2">Roll No</th>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Total Lectures</th>
//             <th className="border px-4 py-2">Present</th>
//             <th className="border px-4 py-2">Absent</th>
//             <th className="border px-4 py-2">Attendance %</th>
//           </tr>
//         </thead>
//         <tbody>
//           {studentPercentages.map((s) => (
//             <tr key={s.rollNo_id}>
//               <td className="border px-4 py-2">{s.rollNo_id}</td>
//               <td className="border px-4 py-2">{`${s.fName} ${s.mName} ${s.lName}`}</td>
//               <td className="border px-4 py-2">{s.total}</td>
//               <td className="border px-4 py-2">{s.present}</td>
//               <td className="border px-4 py-2">{s.absent}</td>
//               <td className="border px-4 py-2">{s.percentage}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* Overall Stats */}
//       {studentPercentagess.length > 0 && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-md shadow">
//           <p>
//             <strong>Total Students:</strong> {overallStats.totalStudents}
//           </p>
//           <p className="text-green-600">
//             <strong>Students with Present:</strong> {overallStats.presentCount}
//           </p>
//           <p className="text-red-600">
//             <strong>Students with Absent:</strong> {overallStats.absentCount}
//           </p>
//         </div>
//       )}
//       {/* Table */}
//       {students.length > 0 && (
//         <div className="overflow-x-auto mt-6 shadow-lg rounded-xl bg-white">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//                 {[
//                   "Roll No",
//                   "First Name",
//                   "Middle Name",
//                   "Last Name",
//                   "Class",
//                   "Semester",
//                   "Division",
//                   "Subject",
//                   "Faculty Id",
//                   "Department",
//                   "Time",
//                   "Date",
//                   "Status",
//                 ].map((heading, idx) => (
//                   <th key={idx} className="px-4 py-2 text-left">
//                     {heading}
//                   </th>
//                 ))}
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
//                   <td className="border px-4 py-2">{student.rollNo_id}</td>
//                   <td className="border px-4 py-2">{student.fName}</td>
//                   <td className="border px-4 py-2">{student.mName}</td>
//                   <td className="border px-4 py-2">{student.lName}</td>
//                   <td className="border px-4 py-2">{student.Class}</td>
//                   <td className="border px-4 py-2">{student.semester}</td>
//                   <td className="border px-4 py-2">{student.div}</td>
//                   <td className="border px-4 py-2">{student.Subject}</td>
//                   <td className="border px-4 py-2">{student.facultyId_id}</td>
//                   <td className="border px-4 py-2">{student.department}</td>
//                   <td className="border px-4 py-2">{student.Time || "-"}</td>
//                   <td className="border px-4 py-2">
//                     {student.date
//                       ? new Date(student.date).toLocaleDateString()
//                       : "-"}
//                   </td>
//                   <td className="border px-4 py-2">{student.status || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useMemo } from "react";
import axios from "axios";

export default function AttendanceForm() {
  // helper: local YYYY-MM-DD string (avoids UTC shift)
  const toLocalDateStr = (d) => {
    const tz = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tz).toISOString().slice(0, 10);
  };
  const todayStr = useMemo(() => toLocalDateStr(new Date()), []);

  const [formdata, setFormData] = useState({
    Class: "",
    semester: "",
    div: "",
    Subject: "",
    rollNo_id: "",
    startDate: "",
    endDate: "",
    status: "",
    batch: "",
    facultyId_id: "",
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentPercentages, setStudentPercentages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [error, setError] = useState("");
  const [subjectWiseStats, setSubjectWiseStats] = useState([]);
  const [facultyStats, setFacultyStats] = useState([]);

  // const calculateFacultyStats = (records) => {
  //   const map = {};
  //   records.forEach((rec) => {
  //     const fId = rec.facultyId_id || "Unknown";
  //     if (!map[fId]) {
  //       map[fId] = { faculty: fId, total: 0, present: 0, absent: 0 };
  //     }
  //     map[fId].total += 1;
  //     if (rec.status === "Present") map[fId].present++;
  //     else map[fId].absent++;
  //   });
  //   return Object.values(map).map((s) => ({
  //     ...s,
  //     percentage: ((s.present / s.total) * 100).toFixed(2),
  //   }));
  // };
  // Handle generic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      setFormData((prev) => {
        let next = { ...prev, [name]: value };
        const start = next.startDate ? new Date(next.startDate) : null;
        const end = next.endDate ? new Date(next.endDate) : null;

        if (start && end && start > end) {
          if (name === "startDate") next.endDate = value;
          else next.startDate = value;
        }
        return next;
      });
      setActiveFilter("");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Quick Filters
  const applyQuickFilter = (type) => {
    const today = new Date();
    const end = toLocalDateStr(today);
    let start = end;

    if (type === "weekly") {
      const d = new Date(today);
      d.setDate(d.getDate() - 7);
      start = toLocalDateStr(d);
    } else if (type === "monthly") {
      const d = new Date(today);
      d.setMonth(d.getMonth() - 1);
      start = toLocalDateStr(d);
    } else if (type === "semester") {
      const d = new Date(today);
      d.setMonth(d.getMonth() - 6);
      start = toLocalDateStr(d);
    }

    setFormData((prev) => ({ ...prev, startDate: start, endDate: end }));
    setActiveFilter(type);
  };
  // --- NEW FUNCTION: Subject-wise statistics ---
  const calculateSubjectWiseStats = (attendanceRecords) => {
    const subjectStats = {};

    attendanceRecords.forEach((rec) => {
      const subject = rec.Subject || "Unknown";

      if (!subjectStats[subject]) {
        subjectStats[subject] = {
          subject,
          totalLectures: 0,
          present: 0,
          absent: 0,
          students: new Set(), // To track unique students per subject
        };
      }

      subjectStats[subject].totalLectures += 1;
      subjectStats[subject].students.add(rec.rollNo_id);

      if (rec.status === "Present") {
        subjectStats[subject].present += 1;
      } else {
        subjectStats[subject].absent += 1;
      }
    });

    // Convert to array & calculate %
    return Object.values(subjectStats).map((s) => ({
      subject: s.subject,
      totalLectures: s.totalLectures,
      totalStudents: s.students.size,
      present: s.present,
      absent: s.absent,
      percentage: ((s.present / s.totalLectures) * 100).toFixed(2),
    }));
  };

  // Fetch & Filter
  const StdDetailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        "http://localhost:7070/api/AttendanceReports"
      );

      if (res.data.success) {
        let filtered = res.data.reports;

        // Apply frontend filters
        if (formdata.Class)
          filtered = filtered.filter((r) => r.Class === formdata.Class);
        if (formdata.semester)
          filtered = filtered.filter((r) => r.semester === formdata.semester);
        if (formdata.div)
          filtered = filtered.filter((r) => r.div === formdata.div);
        if (formdata.batch)
          filtered = filtered.filter((r) => r.batch === formdata.batch);
        if (formdata.Subject)
          filtered = filtered.filter((r) => r.Subject === formdata.Subject);
        if (formdata.facultyId_id)
          filtered = filtered.filter(
            (r) => r.facultyId_id === formdata.facultyId_id
          );
        if (formdata.rollNo_id)
          filtered = filtered.filter((r) => r.rollNo_id === formdata.rollNo_id);
        if (formdata.status)
          filtered = filtered.filter((r) => r.status === formdata.status);

        if (formdata.startDate && formdata.endDate) {
          const start = new Date(formdata.startDate);
          const end = new Date(formdata.endDate);
          filtered = filtered.filter((r) => {
            const d = new Date(r.date);
            return d >= start && d <= end;
          });
        }

        setStudents(filtered);
        setStudentPercentages(calculatePercentages(filtered));
        setSubjectWiseStats(calculateSubjectWiseStats(filtered));
        // setFacultyStats(calculateFacultyStats(filtered));
      } else {
        setStudents([]);
        setError("No records found");
      }
    } catch (err) {
      console.error("❌ Error fetching reports:", err);
      setError("Something went wrong while fetching reports");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentages = (attendanceRecords) => {
    const studentStats = {};

    attendanceRecords.forEach((rec) => {
      const roll = rec.rollNo_id || "Unknown";

      if (!studentStats[roll]) {
        studentStats[roll] = {
          fName: rec.fName,
          mName: rec.mName,
          lName: rec.lName,
          rollNo_id: roll,
          total: 0,
          present: 0,
          absent: 0,
        };
      }

      studentStats[roll].total += 1;
      if (rec.status === "Present") studentStats[roll].present += 1;
      else studentStats[roll].absent += 1;
    });

    return Object.values(studentStats).map((s) => ({
      ...s,
      percentage: ((s.present / s.total) * 100).toFixed(2),
    }));
  };

  const calculateOverallStats = (studentPercentages) => {
    const totalStudents = studentPercentages.length;
    const presentCount = studentPercentages.filter((s) => s.present > 0).length;
    // const absentCount = studentPercentages.filter((s) => s.absent > 0).length;
    const absentCount = totalStudents - presentCount;
    return { totalStudents, presentCount, absentCount };
  };

  const overallStats = useMemo(
    () => calculateOverallStats(studentPercentages),
    [studentPercentages]
  );

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg m-4 mb-6">
          📊 Advanced Attendance Reports
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={StdDetailSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-lg max-w-6xl mx-auto"
      >
        {/* Selects */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Batch */}
          <select
            name="batch"
            value={formdata.batch}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Batch --</option>
            <option value="2024-2026">2024-2026</option>
            <option value="MCA-I">MCA-I</option>
          </select>

          {/* Class */}
          <select
            name="Class"
            value={formdata.Class}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Class --</option>
            <option value="MCA-II">MCA-II</option>
            <option value="MCA-I">MCA-I</option>
          </select>

          {/* Semester */}
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

          {/* Division */}
          <select
            name="div"
            value={formdata.div}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Division --</option>
            <option value="A">A</option>
            <option value="B">B</option>
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
            type="text"
            placeholder="Roll No"
            name="rollNo_id"
            value={formdata.rollNo_id}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Faculty ID"
            name="facultyId_id"
            value={formdata.facultyId_id}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Status"
            name="status"
            value={formdata.status}
            onChange={handleChange}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="startDate"
            value={formdata.startDate}
            onChange={handleChange}
            max={formdata.endDate || todayStr}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="endDate"
            value={formdata.endDate}
            onChange={handleChange}
            min={formdata.startDate || ""}
            max={todayStr}
            className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {["daily", "weekly", "monthly", "semester"].map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => applyQuickFilter(filter)}
              className={`px-4 py-2 rounded-lg text-white shadow-md transition transform hover:scale-105 ${
                activeFilter === filter
                  ? "bg-blue-700"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData((p) => ({ ...p, startDate: "", endDate: "" }));
              setActiveFilter("");
            }}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 shadow transition"
          >
            Clear Dates
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition transform hover:scale-[1.02] mt-4 disabled:opacity-50"
        >
          {loading ? "⏳ Loading..." : "🚀 Generate Report"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-4 text-center text-red-600 font-semibold">
          {error}
        </div>
      )}

      {/* Student Percentage Table */}
      {studentPercentages.length > 0 && (
        <>
          <table className="w-full border-collapse border border-gray-400 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Roll No</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Total Lectures</th>
                <th className="border px-4 py-2">Present</th>
                <th className="border px-4 py-2">Absent</th>
                <th className="border px-4 py-2">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {studentPercentages.map((s) => (
                <tr key={s.rollNo_id}>
                  <td className="border px-4 py-2">{s.rollNo_id}</td>
                  <td className="border px-4 py-2">{`${s.fName} ${s.mName} ${s.lName}`}</td>
                  <td className="border px-4 py-2">{s.total}</td>
                  <td className="border px-4 py-2">{s.present}</td>
                  <td className="border px-4 py-2">{s.absent}</td>
                  <td className="border px-4 py-2">{s.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Overall Stats */}
          <div className="mt-4 p-4 bg-gray-100 rounded-md shadow">
            <p>
              <strong>Total Students:</strong> {overallStats.totalStudents}
            </p>
            <p className="text-green-600">
              <strong>Students with Present:</strong>{" "}
              {overallStats.presentCount}
            </p>
            <p className="text-red-600">
              <strong>Students with Absent:</strong> {overallStats.absentCount}
            </p>
          </div>
        </>
      )}
      {/* Subject-wise Stats */}
      {subjectWiseStats.length > 0 && (
        <div className="overflow-x-auto mt-6 shadow-lg rounded-xl bg-white">
          <h2 className="text-xl font-bold p-4 text-blue-700">
            📘 Subject-wise Attendance Report
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Total Students</th>
                <th className="border px-4 py-2">Total Lectures</th>
                <th className="border px-4 py-2">Present Count</th>
                <th className="border px-4 py-2">Absent Count</th>
                <th className="border px-4 py-2">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {subjectWiseStats.map((s) => (
                <tr key={s.subject} className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-semibold">
                    {s.subject}
                  </td>
                  <td className="border px-4 py-2">{s.totalStudents}</td>
                  <td className="border px-4 py-2">{s.totalLectures}</td>
                  <td className="border px-4 py-2 text-green-600">
                    {s.present}
                  </td>
                  <td className="border px-4 py-2 text-red-600">{s.absent}</td>
                  <td className="border px-4 py-2 font-bold">
                    {s.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* 👨‍🏫 Faculty-wise Summary */}
      {/* {facultyStats.length > 0 && (
        <div className="mt-8 p-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-purple-700">
            👨‍🏫 Faculty-wise Attendance
          </h2>
          <table className="w-full border border-gray-300">
            <thead className="bg-purple-100">
              <tr>
                <th className="border px-4 py-2">Faculty ID</th>
                <th className="border px-4 py-2">Total Lectures</th>
                <th className="border px-4 py-2">Present</th>
                <th className="border px-4 py-2">Absent</th>
                <th className="border px-4 py-2">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {facultyStats.map((f) => (
                <tr key={f.faculty} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-semibold">
                    {f.faculty}
                  </td>
                  <td className="border px-4 py-2">{f.total}</td>
                  <td className="border px-4 py-2 text-green-600">
                    {f.present}
                  </td>
                  <td className="border px-4 py-2 text-red-600">{f.absent}</td>
                  <td className="border px-4 py-2 font-bold">
                    {f.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
      {/* Detailed Records Table */}
      {students.length > 0 && (
        <div className="overflow-x-auto mt-6 shadow-lg rounded-xl bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {[
                  "Roll No",
                  "First Name",
                  "Middle Name",
                  "Last Name",
                  "Class",
                  "Semester",
                  "Division",
                  "Subject",
                  "Faculty Id",
                  "Department",
                  "Time",
                  "Date",
                  "Status",
                ].map((heading) => (
                  <th key={heading} className="px-4 py-2 text-left">
                    {heading}
                  </th>
                ))}
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
                  <td className="border px-4 py-2">{student.fName}</td>
                  <td className="border px-4 py-2">{student.mName}</td>
                  <td className="border px-4 py-2">{student.lName}</td>
                  <td className="border px-4 py-2">{student.Class}</td>
                  <td className="border px-4 py-2">{student.semester}</td>
                  <td className="border px-4 py-2">{student.div}</td>
                  <td className="border px-4 py-2">{student.Subject}</td>
                  <td className="border px-4 py-2">{student.facultyId_id}</td>
                  <td className="border px-4 py-2">{student.department}</td>
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
