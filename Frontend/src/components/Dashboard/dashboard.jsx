import React, { useState } from "react";
import { href } from "react-router-dom";
import DashboardStudentAdd from "../../Pages/DashboardStudentAdd/dashboardStudentAdd";
import DashboardTeacherProfile from "../../Pages/DashboardTeacherProfile/DashboardTeacherProfile";
import StudentAttendance from "../../Pages/ManualAttendance/StudentAttendance";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("welcome");

  const sections = {
    welcome: {
      title: "Welcome to teacher dashboard",
      content:
        "Select an option from the menu to manage attendance, view reports, or update your profile.",
    },
    profile: {
      title: "Profile",
      content: "Hello I Am C.N.Reddy",
      component: <DashboardTeacherProfile />,
    },
    addStudent: {
      title: "Add Student",
      component: <DashboardStudentAdd />,
    },
    manual: {
      title: "Manual Attendance",
      content: "Mark attendance manually for your students.",
      component: <StudentAttendance />,
    },
    digital: {
      title: "Digital Attendance",
      content:
        "Open camera or upload photos/videos to record attendance digitally.",
    },
    reports: {
      title: "Reports / Records",
      content: "Generate attendance reports as Excel or PDF files.",
    },
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar - 40% width */}
      <aside className="w-[40%] bg-gray-800 p-8 flex flex-col">
        <h2 className="text-3xl font-bold mb-10 text-blue-400 tracking-wide">
          Dashboard Menu
        </h2>
        <nav className="flex flex-col gap-4">
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`relative text-left px-6 py-3 rounded-lg font-medium transition
                ${
                  activeSection === key
                    ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {section.title}
              {activeSection === key && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 rounded-l-lg animate-pulse"></span>
              )}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="mt-auto px-6 py-3 rounded-lg font-medium text-red-500 hover:bg-red-700 hover:text-white transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content - 60% width */}
      <main className="w-[60%] p-10 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-tl-[80px] rounded-br-[80px] shadow-2xl flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-400 drop-shadow-lg">
          {sections[activeSection]?.title}
        </h1>
        <div className="text-lg leading-relaxed">
          {sections[activeSection]?.component
            ? sections[activeSection].component
            : sections[activeSection]?.content}
        </div>

        {/* Additional content or components can go here */}
      </main>
    </div>
  );
};

export default Dashboard;
