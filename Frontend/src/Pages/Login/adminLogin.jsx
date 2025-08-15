import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState({ email: "", password: "" });

  const onChangeInput = (event, key) => {
    setLoginField({ ...loginField, [key]: event.target.value });
  };

  const handleLogin = async () => {
    if (
      loginField.email.trim().length === 0 ||
      loginField.password.trim().length === 0
    ) {
      return toast.error("Please fill all credentials");
    }
    try {
      const res = await axios.post(
        "http://localhost:7070/api/admin/login", // Adjust endpoint as needed
        loginField,
        { withCredentials: true }
      );
      localStorage.setItem("isAdminLogin", "true");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminInfo", JSON.stringify(res.data.adminExist));
      navigate("/adminDashboard"); // Redirect admin after login
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Admin Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      {/* Background image with overlay */}
      <img
        src="../../../public/Assets/AttendenceBG.jpg"
        alt="College Attendance Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <Navbar />

      {/* Login card */}
      <div className="relative z-30 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full p-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
          DYPIMED
        </h1>

        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
          Admin Login
        </h1>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
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
              placeholder="Enter admin email"
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
          >
            Sign In
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

export default AdminLogin;
