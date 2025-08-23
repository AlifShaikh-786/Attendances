import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChangeInput = (event, key) => {
    setLoginField({ ...loginField, [key]: event.target.value });
  };

  const handleLogin = async () => {
    if (!loginField.email.trim() || !loginField.password.trim()) {
      return toast.error("Please fill all credentials");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:7070/api/Stdlogin",
        loginField,
        { withCredentials: true }
      );

      const userData = res.data.student || res.data.user || {};
      const token = res.data.token || userData.token; // depending on backend
      const role = userData.role;

      if (!token) {
        toast.error("Token not received from server");
        return;
      }

      // Store data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("isStudentLogin", "true");
      localStorage.setItem("studentInfo", JSON.stringify(userData));

      toast.success("Login successful");

      // Redirect based on role
      if (role === "admin") navigate("/adminDashboard");
      else if (role === "faculty") navigate("/facultyDashboard");
      else if (role === "student") navigate("/studentDashboard");
      else toast.error("Invalid role");
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Student login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <img
        src="/Assets/AttendenceBG.jpg"
        alt="College Attendance Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <Navbar />

      <div className="relative z-30 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full p-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
          DYPIMED Student Login
        </h1>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) handleLogin();
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Email Address*
            </label>
            <input
              id="email"
              type="email"
              value={loginField.email}
              onChange={(e) => onChangeInput(e, "email")}
              placeholder="Enter student email"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Password*
            </label>
            <input
              id="password"
              type="password"
              value={loginField.password}
              onChange={(e) => onChangeInput(e, "password")}
              placeholder="Enter password"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-blue-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-semibold transition duration-300 shadow-lg"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>

      <div className="pb-10">
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default StudentLogin;
