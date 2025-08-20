import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import AdminDashboard from "./components/AdminDashboard/adminDashboard";
import AdminLogin from "./Pages/Login/AdminLogin";
import StudentLogin from "./Pages/Login/studentLogin";

import FacultyDashboard from "./components/FacultyDashboard/facultyDashboard";
import StudentDashboard from "./components/StudentDashboard/studentDashboard";
import Register from "./Pages/Student/Register";
import StdAttendance from "./Pages/studentAttendance/stdAttendance";
import StudentAttendance from "./Pages/studentAttendance/StudentAttendance";
import AttendanceForm from "./Pages/Reports/Reports";
import About from "./Pages/About/about";
import LearnMore from "./Pages/LearnMore/learnMore";

// Optional 404 page
const ErrorPage = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>404 - Not Found</h1>
    <p>The page you're looking for does not exist.</p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landingPage" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/learnMore" element={<LearnMore />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/studentLogin" element={<StudentLogin />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/facultyDashboard" element={<FacultyDashboard />} />
      <Route path="/studentDashboard" element={<StudentDashboard />} />
      <Route path="/Register-s" element={<Register />} />
      <Route path="/stdAttendance-s" element={<StdAttendance />} />
      <Route path="/StudentAttendance-s" element={<StudentAttendance />} />
      <Route path="/AttendanceForm-s" element={<AttendanceForm />} />

      {/* Catch-all 404 route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
