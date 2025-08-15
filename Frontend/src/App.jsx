// import { useState } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// // import "./App.css";
// import StudentAttendance from "./Pages/StudentAttendance";
// import Register from "./Pages/Student/Register";
// import StdAttendance from "./Pages/studentAttendance/stdAttendance";

// const ErrorPage = () => (
//   <div style={{ padding: "2rem", textAlign: "center" }}>
//     <h1>404 - Not Found</h1>
//     <p>The page you're looking for does not exist.</p>
//   </div>
// );

// const router = createBrowserRouter([
//   {
//     path: "/StudentAttendance-s",
//     element: <StudentAttendance />,
//     errorElement: <ErrorPage />,
//   },

//   {
//     path: "/",
//     element: <Register />,
//     errorElement: <ErrorPage />,
//   },

//   {
//     path: "/stdAttendance-s",
//     element: <StdAttendance />,
//     errorElement: <ErrorPage />,
//   },
// ]);
// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

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
// import ErrorPage from "./Pages/Error/ErrorPage"; // your 404 page

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landingPage" element={<LandingPage />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/studentLogin" element={<StudentLogin />} />

      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/facultyDashboard" element={<FacultyDashboard />} />
      <Route path="/studentDashboard" element={<StudentDashboard />} />
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  );
}

export default App;
