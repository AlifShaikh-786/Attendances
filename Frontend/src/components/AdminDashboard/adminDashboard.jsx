// import React, { useState } from "react";
// import Register from "../../Pages/Student/Register";
// import Register1 from "../../Pages/Faculty/register";
// import StudentAttendance from "../../Pages/studentAttendance/StudentAttendance";
// import StdAttendance from "../../Pages/studentAttendance/stdAttendance";

// const AdminDashboard = () => {
//   const [activeSection, setActiveSection] = useState("welcome");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const sections = {
//     welcome: {
//       title: "Welcome to Admin Dashboard",
//       content:
//         "Select an option from the menu to manage attendance, view reports, or update your profile.",
//     },
//     addStudent: { title: "Add Student", component: <Register /> },
//     addTeacher: {
//       title: "Add Teacher",
//       component: <Register1 />,
//     },
//     manualAttendance: {
//       title: "Manual Attendance",
//       component: <StudentAttendance />,
//     },
//     digitalAttendance: {
//       title: "Digital Attendance",
//       component: <StdAttendance />,
//     },
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-black">
//       {/* Sidebar for desktop */}
//       <aside className="hidden md:flex w-[25%] bg-gray-800 p-8 flex-col">
//         <h2 className="text-3xl font-bold mb-10 text-blue-400 tracking-wide">
//           Dashboard Menu
//         </h2>
//         <nav className="flex flex-col gap-4">
//           {Object.entries(sections).map(([key, section]) => (
//             <button
//               key={key}
//               onClick={() => setActiveSection(key)}
//               className={`relative text-left px-5 py-3 rounded-lg font-medium transition
//                 ${
//                   activeSection === key
//                     ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg"
//                     : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                 } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             >
//               {section.title}
//               {activeSection === key && (
//                 <span className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 rounded-l-lg animate-pulse"></span>
//               )}
//             </button>
//           ))}
//           <button
//             onClick={handleLogout}
//             className="mt-auto px-5 py-3 rounded-lg font-medium text-white bg-red-700 hover:bg-red-500 transition"
//           >
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Mobile Dropdown */}
//       <div className="md:hidden w-full flex flex-col">
//         <div className="p-4 bg-gray-800 flex justify-between items-center w-full">
//           <h2 className="text-2xl font-bold text-blue-400">Dashboard Menu</h2>
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="text-white text-xl"
//           >
//             {mobileMenuOpen ? "✖" : "☰"}
//           </button>
//         </div>

//         {mobileMenuOpen && (
//           <nav className="p-4 bg-gray-800 flex flex-col gap-3 w-full">
//             {Object.entries(sections).map(([key, section]) => (
//               <button
//                 key={key}
//                 onClick={() => {
//                   setActiveSection(key);
//                   setMobileMenuOpen(false);
//                 }}
//                 className={`px-4 py-3 rounded-lg font-medium transition w-full text-left
//                   ${
//                     activeSection === key
//                       ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg"
//                       : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                   }`}
//               >
//                 {section.title}
//               </button>
//             ))}
//             <button
//               onClick={handleLogout}
//               className="px-4 py-3 rounded-lg font-medium text-white bg-red-700 hover:bg-red-500 transition w-full"
//             >
//               Logout
//             </button>
//           </nav>
//         )}
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 w-full p-6 md:p-10 bg-white bg-opacity-80 backdrop-blur-md shadow-2xl flex flex-col overflow-auto min-h-screen">
//         <h1 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 text-blue-400 drop-shadow-lg">
//           {sections[activeSection]?.title}
//         </h1>
//         <div className="text-base md:text-lg leading-relaxed flex-1">
//           {sections[activeSection]?.component
//             ? sections[activeSection].component
//             : sections[activeSection]?.content}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import Register from "../../Pages/Student/Register";
import Register1 from "../../Pages/Faculty/register";
import StudentAttendance from "../../Pages/studentAttendance/StudentAttendance";
import StdAttendance from "../../Pages/studentAttendance/stdAttendance";
import { Menu, X } from "lucide-react";
import Report from "../../Pages/Report/report";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = {
    welcome: {
      title: "Welcome to Admin Dashboard",
      content:
        "Select an option from the menu to manage attendance, view reports, or update your profile.",
    },
    addStudent: { title: "Add Student", component: <Register /> },
    addTeacher: { title: "Add Teacher", component: <Register1 /> },
    manualAttendance: {
      title: "Manual Attendance",
      component: <StudentAttendance />,
    },
    digitalAttendance: {
      title: "Digital Attendance",
      component: <StdAttendance />,
    },
    Reports: { title: "Reports/Records", component: <Report /> },
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-black">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-[25%] bg-gray-800 p-8 flex-col overflow-y-auto">
        <h2 className="text-3xl font-bold mb-10 text-blue-400 tracking-wide">
          Dashboard Menu
        </h2>
        <nav className="flex flex-col gap-4 flex-1">
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`relative text-left px-5 py-3 rounded-lg font-medium transition
                ${
                  activeSection === key
                    ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {section.title}
              {activeSection === key && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 rounded-l-lg animate-pulse"></span>
              )}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="mt-auto px-5 py-3 rounded-lg font-medium text-white bg-red-700 hover:bg-red-500 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 z-50">
        <h2 className="text-2xl font-bold text-blue-400">Dashboard Menu</h2>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-white text-2xl"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sliding Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Menu */}
        <nav className="flex flex-col gap-3 mt-4 px-4">
          {Object.entries(sections).map(([key, section], index) => (
            <button
              key={key}
              onClick={() => {
                setActiveSection(key);
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-lg font-medium transition text-left transform duration-300 ease-in-out ${
                activeSection === key
                  ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {section.title}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="px-4 py-3 rounded-lg font-medium text-white bg-red-700 hover:bg-red-500 transition"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full p-6 md:p-10 bg-white bg-opacity-80 backdrop-blur-md shadow-2xl overflow-y-auto mt-14 md:mt-0 md:ml-[25%]">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-400 drop-shadow-lg">
          {sections[activeSection]?.title}
        </h1>
        <div className="text-base md:text-lg leading-relaxed">
          {sections[activeSection]?.component
            ? sections[activeSection].component
            : sections[activeSection]?.content}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

// src/components/Dashboard/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch students from backend
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await axios.get("http://localhost:7070/api/students");
//         setStudents(res.data);
//       } catch (err) {
//         console.error("Error fetching students:", err);
//         setError("Failed to load students.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-600">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

//       {students.length === 0 ? (
//         <p className="text-gray-600">No students found.</p>
//       ) : (
//         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//           {students.map((student) => (
//             <div
//               key={student._id}
//               className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
//             >
//               <img
//                 src={
//                   student.photo
//                     ? `http://localhost:7070/uploads/${student.photo}`
//                     : "https://via.placeholder.com/150"
//                 }
//                 alt={student.name}
//                 className="w-full h-40 object-cover rounded-lg mb-3"
//               />
//               <h2 className="text-lg font-semibold">{student.name}</h2>
//               <p className="text-sm text-gray-600">
//                 Roll No: {student.rollNumber}
//               </p>
//               <p className="text-sm text-gray-600">
//                 Class: {student.class} - {student.section}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
