import React, { useState } from "react";
import Report from "../../Pages/Report/studentAttendanceReport";
import Application from "../../Pages/Application/application";
import Navbar from "../Navbar/navbar";
import DisplyApplicationStd from "../../Pages/Application/DisplyApplicationStd";
import PersonalInfoStd from "../../Pages/Student/PersonalInfo";
import EditProfile from "../../Pages/Student/EditProfile";

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = {
    welcome: {
      title: "Welcome to Student Dashboard",
      content:
        "Select an option from the menu to manage attendance, view reports, or update your profile.",
    },
    PersonalInfoFaculty: {
      title: "Personal Information",
      component: <PersonalInfoStd />,
    },
    EditPersonalInfoFaculty: {
      title: "Edit Information",
      component: <EditProfile />,
    },
    Reports: {
      title: "Reports/Records",
      component: <Report />,
    },
    application: {
      title: "Application",
      component: <Application />,
    },
    DisplyApplication: {
      title: "Application Status",
      component: <DisplyApplicationStd />,
    },
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex min-h-screen bg-gray-800 text-black">
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
          <nav className="flex flex-col gap-3 p-4 ">
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
        <main className="flex-1 p-6 md:p-10 bg-gray-300  shadow-2xl flex flex-col overflow-auto mt-[64px] md:mt-0 md:ml-64">
          <h1 className="text-3xl md:text-4x  font-extrabold mb-6 text-blue-400 drop-shadow-lg">
            {sections[activeSection]?.title}
          </h1>
          <div className="text-base md:text-lg leading-relaxed">
            {sections[activeSection]?.component
              ? sections[activeSection].component
              : sections[activeSection]?.content}
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;
