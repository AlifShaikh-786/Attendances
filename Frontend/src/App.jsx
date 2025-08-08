// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // import "./App.css";
// import StudentAttendance from "./Pages/StudentAttendance";
// import LandingPage from "./Pages/LandingPage/landingPage";

// const ErrorPage = () => (
//   <div style={{ padding: "2rem", textAlign: "center" }}>
//     <h1>404 - Not Found</h1>
//     <p>The page you're looking for does not exist.</p>
//   </div>
// );

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <StudentAttendance />,
//     errorElement: <ErrorPage />,
//   },
// ]);
// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />}></Route>
//     </Routes>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentAttendance from "./Pages/StudentAttendance";
import LandingPage from "./Pages/LandingPage/landingPage";

const ErrorPage = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>404 - Not Found</h1>
    <p>The page you're looking for does not exist.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page will be shown first */}
        <Route path="/" element={<LandingPage />} />

        {/* Student attendance page */}
        <Route path="/attendance" element={<StudentAttendance />} />

        {/* Catch-all for 404 errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
