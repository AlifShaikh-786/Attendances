// import React, { useState } from "react";

// const StudentAttendance = () => {
//   const [formdata, setFormData] = useState({
//     Class: "",
//     semester: "",
//     div: "",
//     Subject: "",
//     Time: "",
//     date: "",
//   });

//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});

//   const handleChange = (e) => {
//     setFormData({
//       ...formdata,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleCheckboxChange = (id) => {
//     setAttendance((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };
//   const isValidTime = (inputTime) => {
//     const [hours, minutes] = inputTime.split(":").map(Number);
//     const input = new Date();
//     input.setHours(hours, minutes, 0);

//     const start = new Date();
//     start.setHours(9, 30, 0); // 9:30 AM

//     const end = new Date();
//     end.setHours(17, 0, 0); // 5:00 PM

//     return input >= start && input <= end;
//   };
//   const StdDetailSubmit = async (e) => {
//     e.preventDefault();
//     const time = formdata.Time; // e.g., "10:45"

//     if (!isValidTime(time)) {
//       alert("❌ Time must be between 9:30 AM and 5:00 PM");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:7070/api/StdDisplays", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           Class: formdata.Class,
//           semester: formdata.semester,
//           div: formdata.div,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStudents(data);
//         const defaultAttendance = {};
//         data.forEach((student) => {
//           defaultAttendance[student._id] = false; // default to absent
//         });
//         setAttendance(defaultAttendance);
//       } else {
//         alert("Student Details Not Found: " + (data?.msg || "Unknown Error"));
//       }
//     } catch (error) {
//       alert("Server Error: " + error.message);
//       console.error("Error:", error);
//     }
//   };

//   const countPresent = Object.values(attendance).filter((val) => val).length;
//   const total = students.length;
//   const absent = total - countPresent;

//   // ✅ Only ONE saveAttendance function — this one sends attendance one-by-one
//   const saveAttendance = async () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to save attendance?"
//     );
//     if (!confirmed) return;
//     for (const student of students) {
//       const payload = {
//         Class: formdata.Class,
//         semester: formdata.semester,
//         div: formdata.div,
//         stdName: student.stdName,
//         rollNo: student.rollNo,
//         image: student.image || "N/A", // fallback if image is missing
//         date: formdata.date,
//         Time: formdata.Time,
//         status: attendance[student._id] ? "Present" : "Absent",
//         Subject: formdata.Subject,
//       };

//       try {
//         const res = await fetch("http://localhost:7070/api/AddAttendances", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) {
//           const error = await res.json();
//           console.error(`❌ Failed for ${student.stdName}`, error);
//         }
//       } catch (error) {
//         console.error(`❌ Network error for ${student.stdName}`, error);
//       }
//     }

//     alert("✅ Attendance submitted successfully!");
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-slate-300 items-center justify-center mt-10   rounded-2xl shadow-lg">
//       <h1 className="flex items-center justify-center mb-5 font-bold text-2xl">
//         Mark Attendance{" "}
//       </h1>
//       <form onSubmit={StdDetailSubmit} className="space-y-4">
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           <select name="Class" value={formdata.Class} onChange={handleChange}>
//             <option value="">-- Select Class --</option>
//             <option value="MCA-II">MCA-II</option>
//             <option value="MCA-I">MCA-I</option>
//           </select>
//           <select
//             name="Semester"
//             value={formdata.semester}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Semester --</option>
//             <option value="I">I</option>
//             <option value="II">II</option>
//             <option value="III">III</option>
//             <option value="IV">IV</option>
//           </select>

//           <select name="Div" value={formdata.div} onChange={handleChange}>
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
//             required
//             className="input-field"
//           />
//           <input
//             type="time"
//             name="Time"
//             value={formdata.Time}
//             onChange={handleChange}
//             required
//             className="input-field"
//           />
//           <input
//             type="date"
//             name="date"
//             value={formdata.date}
//             onChange={handleChange}
//             // max={new Date().toISOString().split("T")[0]}
//             // min={new Date().toISOString().split("T")[0]}
//             required
//             className="input-field"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
//         >
//           Load Students
//         </button>
//       </form>

//       {students.length > 0 && (
//         <div className="mt-8">
//           <div className="text-lg font-semibold mb-4 text-center text-gray-800">
//             Present: <span className="text-green-600">{countPresent}</span> |
//             Absent: <span className="text-red-600">{absent}</span> | Total:{" "}
//             <span className="text-indigo-600">{total}</span>
//           </div>

//           <ul className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
//             {students.map((student) => (
//               <li
//                 key={student._id}
//                 className="flex items-center justify-between px-4 py-2 bg-white shadow rounded-md"
//               >
//                 <label className="flex items-center space-x-3 w-full">
//                   <input
//                     type="checkbox"
//                     checked={attendance[student._id] || false}
//                     onChange={() => handleCheckboxChange(student._id)}
//                     className="w-5 h-5 text-blue-600 accent-blue-600"
//                   />
//                   <span className="text-gray-700 font-medium">
//                     {student.StdName} ({student.RollNo})
//                   </span>
//                 </label>
//               </li>
//             ))}
//           </ul>

//           <button
//             onClick={saveAttendance}
//             className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition"
//           >
//             Save Attendance
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentAttendance;
// import React, { useState } from "react";

// const StudentAttendance = () => {
//   const [formdata, setFormData] = useState({
//     Class: "",
//     semester: "",
//     div: "",
//     Subject: "",
//     Time: "",
//     date: "",
//   });

//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});

//   const handleChange = (e) => {
//     setFormData({
//       ...formdata,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleCheckboxChange = (id) => {
//     setAttendance((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const isValidTime = (inputTime) => {
//     if (!inputTime) return false;
//     const [hours, minutes] = inputTime.split(":").map(Number);
//     if (isNaN(hours) || isNaN(minutes)) return false;

//     const input = new Date();
//     input.setHours(hours, minutes, 0);

//     const start = new Date();
//     start.setHours(9, 30, 0); // 9:30 AM

//     const end = new Date();
//     end.setHours(17, 0, 0); // 5:00 PM

//     return input >= start && input <= end;
//   };

//   const StdDetailSubmit = async (e) => {
//     e.preventDefault();
//     const time = formdata.Time; // e.g., "10:45"

//     if (!isValidTime(time)) {
//       alert("❌ Time must be between 9:30 AM and 5:00 PM");
//       return;
//     }

//     if (!formdata.Class || !formdata.semester || !formdata.div) {
//       alert("Please select Class, Semester, and Division");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:7070/api/StdDisplays", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           Class: formdata.Class,
//           semester: formdata.semester,
//           div: formdata.div,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStudents(data);
//         const defaultAttendance = {};
//         data.forEach((student) => {
//           defaultAttendance[student._id] = false; // default to absent
//         });
//         setAttendance(defaultAttendance);
//       } else {
//         alert("Student Details Not Found: " + (data?.msg || "Unknown Error"));
//         setStudents([]);
//         setAttendance({});
//       }
//     } catch (error) {
//       alert("Server Error: " + error.message);
//       console.error("Error:", error);
//     }
//   };

//   const countPresent = Object.values(attendance).filter((val) => val).length;
//   const total = students.length;
//   const absent = total - countPresent;

//   // Send attendance one-by-one
//   const saveAttendance = async () => {
//     if (!formdata.Subject) {
//       alert("Please enter the Subject before saving attendance.");
//       return;
//     }
//     if (!formdata.date) {
//       alert("Please select a date before saving attendance.");
//       return;
//     }
//     if (!formdata.Time) {
//       alert("Please select time before saving attendance.");
//       return;
//     }

//     const confirmed = window.confirm(
//       "Are you sure you want to save attendance?"
//     );
//     if (!confirmed) return;

//     // for (const student of students) {
//     const attendanceList = students.map((student) => ({
//       Class: formdata.Class,
//       semester: formdata.semester,
//       div: formdata.div,
//       image: student.image ? student.image[0] : "",
//       stdName: student.stdName,
//       date: formdata.date,
//       Time: formdata.Time,
//       rollNo: student.rollNo,
//       status: attendance[student._id] ? "Present" : "Absent",
//       Subject: formdata.Subject,
//     }));

//     if (!attendanceList.length) {
//       alert("No attendance records to submit!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:7070/api/AddAttendances", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ attendanceList }),
//       });

//       if (response.ok) {
//         alert("Attendance saved successfully!");
//       } else {
//         const errorData = await response.json();
//         alert(
//           "Failed to save attendance: " + (errorData?.msg || "Unknown error")
//         );
//       }
//     } catch (err) {
//       alert("Error submitting attendance: " + err.message);
//     }
//     // }

//     // alert("✅ Attendance submitted successfully!");
//   };

//   return (
//     <div className=" items-center gap-3 group">
//       <div className="flex gap-3">
//         <img
//           src="/Assets/DYPIMED-Logo.png"
//           alt="DYPIMED Logo"
//           className="w-20 h-20 animate-bounce transition-transform duration-300 group-hover:scale-110"
//           loading="lazy"
//           draggable={false}
//         />
//         <h3
//           className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600
//                      font-extrabold text-2xl md:text-3xl select-none
//                      drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
//         >
//           DYPIMED
//         </h3>
//       </div>
//       <div className="p-6 max-w-3xl mx-auto bg-slate-300 items-center justify-center mt-10 rounded-2xl shadow-lg">
//         <h1 className="flex items-center justify-center mb-5 font-bold text-2xl">
//           Mark Attendance
//         </h1>
//         <form onSubmit={StdDetailSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <select
//               name="Class"
//               value={formdata.Class}
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- Select Class --</option>
//               <option value="MCA-II">MCA-II</option>
//               <option value="MCA-I">MCA-I</option>
//             </select>
//             <select
//               name="semester"
//               value={formdata.semester}
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- Select Semester --</option>
//               <option value="I">I</option>
//               <option value="II">II</option>
//               <option value="III">III</option>
//               <option value="IV">IV</option>
//             </select>

//             <select
//               name="div"
//               value={formdata.div}
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- Select Division --</option>
//               <option value="A">A</option>
//               <option value="B">B</option>
//             </select>

//             <input
//               type="text"
//               placeholder="Subject"
//               name="Subject"
//               value={formdata.Subject}
//               onChange={handleChange}
//               required
//               className="input-field"
//             />
//             <input
//               type="time"
//               name="Time"
//               value={formdata.Time}
//               onChange={handleChange}
//               required
//               className="input-field"
//             />
//             <input
//               type="date"
//               name="date"
//               value={formdata.date}
//               onChange={handleChange}
//               max={new Date().toISOString().split("T")[0]}
//               required
//               className="input-field"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
//           >
//             Load Students
//           </button>
//         </form>

//         {students.length > 0 && (
//           <div className="mt-8">
//             <div className="text-lg font-semibold mb-4 text-center text-gray-800">
//               Present: <span className="text-green-600">{countPresent}</span> |
//               Absent: <span className="text-red-600">{absent}</span> | Total:{" "}
//               <span className="text-indigo-600">{total}</span>
//             </div>

//             <ul className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
//               {students.map((student) => (
//                 <li
//                   key={student._id}
//                   className="flex items-center justify-between px-4 py-2 bg-white shadow rounded-md"
//                 >
//                   <label className="flex items-center space-x-3 w-full cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={attendance[student._id] || false}
//                       onChange={() => handleCheckboxChange(student._id)}
//                       className="w-5 h-5 text-blue-600 accent-blue-600"
//                     />
//                     <span className="text-gray-700 font-medium">
//                       {student.stdName || student.StdName} (
//                       {student.rollNo || student.RollNo})
//                     </span>
//                   </label>
//                 </li>
//               ))}
//             </ul>

//             <button
//               onClick={saveAttendance}
//               className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition"
//             >
//               Save Attendance
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentAttendance;

import React, { useState } from "react";

const StudentAttendance = () => {
  const [formdata, setFormData] = useState({
    Class: "",
    semester: "",
    div: "",
    Subject: "",
    Time: "",
    date: "",
  });

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isValidTime = (inputTime) => {
    if (!inputTime) return false;
    const [hours, minutes] = inputTime.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return false;

    const input = new Date();
    input.setHours(hours, minutes, 0);

    const start = new Date();
    start.setHours(9, 30, 0);

    const end = new Date();
    end.setHours(17, 0, 0);

    return input >= start && input <= end;
  };

  const StdDetailSubmit = async (e) => {
    e.preventDefault();
    const time = formdata.Time;

    if (!isValidTime(time)) {
      alert("❌ Time must be between 9:30 AM and 5:00 PM");
      return;
    }

    if (!formdata.Class || !formdata.semester || !formdata.div) {
      alert("Please select Class, Semester, and Division");
      return;
    }

    try {
      const response = await fetch("http://localhost:7070/api/StdDisplays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Class: formdata.Class,
          semester: formdata.semester,
          div: formdata.div,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStudents(data);
        const defaultAttendance = {};
        data.forEach((student) => {
          defaultAttendance[student._id] = false;
        });
        setAttendance(defaultAttendance);
      } else {
        alert("Student Details Not Found: " + (data?.msg || "Unknown Error"));
        setStudents([]);
        setAttendance({});
      }
    } catch (error) {
      alert("Server Error: " + error.message);
      console.error("Error:", error);
    }
  };

  const countPresent = Object.values(attendance).filter((val) => val).length;
  const total = students.length;
  const absent = total - countPresent;

  const saveAttendance = async () => {
    if (!formdata.Subject) {
      alert("Please enter the Subject before saving attendance.");
      return;
    }
    if (!formdata.date) {
      alert("Please select a date before saving attendance.");
      return;
    }
    if (!formdata.Time) {
      alert("Please select time before saving attendance.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to save attendance?"
    );
    if (!confirmed) return;

    const attendanceList = students.map((student) => ({
      Class: formdata.Class,
      semester: formdata.semester,
      div: formdata.div,
      image: student.image ? student.image[0] : "",
      stdName: student.stdName,
      date: formdata.date,
      Time: formdata.Time,
      rollNo: student.rollNo,
      status: attendance[student._id] ? "Present" : "Absent",
      Subject: formdata.Subject,
    }));

    if (!attendanceList.length) {
      alert("No attendance records to submit!");
      return;
    }

    try {
      const response = await fetch("http://localhost:7070/api/AddAttendances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendanceList }),
      });

      if (response.ok) {
        alert("Attendance saved successfully!");
      } else {
        const errorData = await response.json();
        alert(
          "Failed to save attendance: " + (errorData?.msg || "Unknown error")
        );
      }
    } catch (err) {
      alert("Error submitting attendance: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10">
      {/* Logo + College Name */}
      <div className="flex gap-3 justify-center mb-6">
        <img
          src="/Assets/DYPIMED-Logo.png"
          alt="DYPIMED Logo"
          className="w-20 h-20 animate-bounce transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          draggable={false}
        />
        <h3
          className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600
                     font-extrabold text-2xl md:text-3xl select-none
                     drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
        >
          DYPIMED
        </h3>
      </div>

      {/* Main Attendance Form Container */}
      <div className="bg-slate-300 p-6 rounded-2xl shadow-lg">
        <h1 className="flex items-center justify-center mb-5 font-bold text-2xl">
          Mark Attendance
        </h1>
        <form onSubmit={StdDetailSubmit} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <select
              name="Class"
              value={formdata.Class}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Class --</option>
              <option value="MCA-II">MCA-II</option>
              <option value="MCA-I">MCA-I</option>
            </select>
            <select
              name="semester"
              value={formdata.semester}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Semester --</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>

            <select
              name="div"
              value={formdata.div}
              onChange={handleChange}
              required
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
              required
              className="input-field"
            />
            <input
              type="time"
              name="Time"
              value={formdata.Time}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              type="date"
              name="date"
              value={formdata.date}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              required
              className="input-field"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Load Students
          </button>
        </form>

        {students.length > 0 && (
          <div className="mt-8">
            <div className="text-lg font-semibold mb-4 text-center text-gray-800">
              Present: <span className="text-green-600">{countPresent}</span> |
              Absent: <span className="text-red-600">{absent}</span> | Total:{" "}
              <span className="text-indigo-600">{total}</span>
            </div>

            <ul className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              {students.map((student) => (
                <li
                  key={student._id}
                  className="flex items-center justify-between px-4 py-2 bg-white shadow rounded-md"
                >
                  <label className="flex items-center space-x-3 w-full cursor-pointer">
                    <input
                      type="checkbox"
                      checked={attendance[student._id] || false}
                      onChange={() => handleCheckboxChange(student._id)}
                      className="w-5 h-5 text-blue-600 accent-blue-600"
                    />
                    <span className="text-gray-700 font-medium">
                      {student.stdName || student.StdName} (
                      {student.rollNo || student.RollNo})
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            <button
              onClick={saveAttendance}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition"
            >
              Save Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAttendance;
