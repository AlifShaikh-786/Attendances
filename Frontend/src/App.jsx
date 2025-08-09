import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import "./App.css";
import StudentAttendance from "./Pages/StudentAttendance";
import Register from "./Pages/Student/Register";
import StdAttendance from "./Pages/studentAttendance/stdAttendance";

const ErrorPage = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>404 - Not Found</h1>
    <p>The page you're looking for does not exist.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/StudentAttendance-s",
    element: <StudentAttendance />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/",
    element: <Register />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/stdAttendance-s",
    element: <StdAttendance />,
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
