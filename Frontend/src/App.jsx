import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import "./App.css";
import StudentAttendance from "./Pages/StudentAttendance";

const ErrorPage = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>404 - Not Found</h1>
    <p>The page you're looking for does not exist.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <StudentAttendance />,
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
