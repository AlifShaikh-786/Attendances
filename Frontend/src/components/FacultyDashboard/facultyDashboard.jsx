// import React, { useState } from "react";
// import Register from "../../Pages/Student/Register";
// import Register1 from "../../Pages/Faculty/register"; // adjust path if needed
// import StudentAttendance from "../../Pages/studentAttendance/StudentAttendance";
// import StdAttendance from "../../Pages/studentAttendance/stdAttendance";
// import Report from "../../Pages/Report/report";
// const FacultyDashbaord = () => {
//   const [activeSection, setActiveSection] = useState("welcome");

//   const sections = {
//     welcome: {
//       title: "Welcome to Faculty Dashboard",
//       content:
//         "Select an option from the menu to manage attendance, view reports, or update your profile.",
//     },
//     addStudent: {
//       title: "Add Student",
//       component: <Register />,
//     },
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

//     Reports: {
//       title: "Reports/Records",
//       component: <Report />,
//     },
//     // You can add more sections here
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/"; // or wherever your login page is
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-black">
//       {/* Sidebar - full width on mobile, 25% on md+ */}
//       <aside className="w-full md:w-[25%] bg-gray-800 p-6 md:p-8 flex flex-col">
//         <h2 className="text-3xl font-bold mb-8 md:mb-10 text-blue-400 tracking-wide">
//           Dashboard Menu
//         </h2>
//         <nav className="flex flex-col gap-3 md:gap-4">
//           {Object.entries(sections).map(([key, section]) => (
//             <button
//               key={key}
//               onClick={() => setActiveSection(key)}
//               className={`relative text-left px-5 py-3 rounded-lg font-medium transition
//             ${
//               activeSection === key
//                 ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg"
//                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
//             }
//             focus:outline-none focus:ring-2 focus:ring-blue-500`}
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

//       {/* Main Content - full width on mobile, 75% on md+ */}
//       <main className="w-full md:w-[75%] p-6 md:p-10 bg-white bg-opacity-80 backdrop-blur-md shadow-2xl flex flex-col overflow-auto">
//         <h1 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 text-blue-400 drop-shadow-lg">
//           {sections[activeSection]?.title}
//         </h1>
//         <div className="text-base md:text-lg leading-relaxed">
//           {sections[activeSection]?.component
//             ? sections[activeSection].component
//             : sections[activeSection]?.content}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default FacultyDashbaord;

import React, { useState } from "react";
import Register from "../../Pages/Student/Register";
// import Register1 from "../../Pages/Faculty/register";
import StudentAttendance from "../../Pages/studentAttendance/StudentAttendance";
import StdAttendance from "../../Pages/studentAttendance/stdAttendance";
import Report from "../../Pages/Report/report";

const FacultyDashboard = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = {
    welcome: {
      title: "Welcome to Faculty Dashboard",
      content:
        "Select an option from the menu to manage attendance, view reports, or update your profile.",
    },
    addStudent: { title: "Add Student", component: <Register /> },
    // addTeacher: { title: "Add Teacher", component: <Register1 /> },
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
      {/* 📱 Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 p-4 bg-gray-800 text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">Dashboard Menu</h2>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="px-3 py-2 bg-blue-500 rounded-lg"
        >
          ☰
        </button>
      </div>

      {/* 📱 Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white text-xl"
          >
            ✖
          </button>
        </div>

        {/* Drawer Menu */}
        <nav className="flex flex-col gap-3 p-4">
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => {
                setActiveSection(key);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-5 py-3 rounded-lg font-medium transition
                ${
                  activeSection === key
                    ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {section.title}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="px-5 py-3 rounded-lg font-medium text-white bg-red-700 hover:bg-red-500 transition"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* 💻 Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-gray-800 p-8 fixed h-full">
        <h2 className="text-3xl font-bold mb-8 text-blue-400">
          Dashboard Menu
        </h2>
        <nav className="flex flex-col gap-4">
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

      {/* 📝 Main Content */}
      <main className="flex-1 p-6 md:p-10 bg-white bg-opacity-80 backdrop-blur-md shadow-2xl flex flex-col overflow-auto mt-[64px] md:mt-0 md:ml-64">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-400 drop-shadow-lg">
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

export default FacultyDashboard;
