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
  // const handalback = () => {
  //   navigate("/");
  // };
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
      else if (role === "hod") navigate("/HodDashBoard");
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
  const handPass = () => {
    navigate("./ForgotPassword-s");
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* <img
        src="/Assets/AttendenceBG.jpg"
        alt="College Attendance Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <Navbar /> */}

      <div className="relative z-30  bg-purple-500 bg-opacity-90  backdrop-blur-md rounded-xl shadow-2xl max-w-md w-96 mt-28   p-8">
        {/* <button onClick={handalback} className="pl-[380px]">
          back
        </button> */}
        {/* <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          ← Back
        </button> */}

        <h1 className="text-4xl font-bold mb-8 text-center text-black">
          User Login
        </h1>

        <form
          className="space-y-6 text-black"
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) handleLogin();
          }}
        >
          <div>
            <div className="flex flex-row">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Enter email
              </label>
              <span className="text-red-600 pl-1">*</span>
            </div>

            <input
              id="email"
              type="email"
              value={loginField.email}
              onChange={(e) => onChangeInput(e, "email")}
              placeholder="Enter email"
              className="w-full rounded-md border border-gray-600  px-4 py-3 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <div className="flex flex-row">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Enter Password
              </label>
              <span className="text-red-600 pl-1">*</span>
            </div>
            <input
              id="password"
              type="password"
              value={loginField.password}
              onChange={(e) => onChangeInput(e, "password")}
              placeholder="Enter password"
              className="w-full rounded-md border border-gray-600  px-4 py-3 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
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
        <div className="flex justify-center pt-4 text-red-700 ">
          <button onClick={handPass}>forgot Password?</button>
        </div>
      </div>

      <div className="pb-10">
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default StudentLogin;
