import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "../../components/GoogleLogin/googleLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

const SignUp = (props) => {
  const navigate = useNavigate();
  const [registerField, setRegisterField] = useState({
    email: "",
    password: "",
    f_name: "",
  });

  const handleInputField = (event, key) => {
    setRegisterField({ ...registerField, [key]: event.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { email, password, f_name } = registerField;

    if (!email.trim() || !password.trim() || !f_name.trim()) {
      return toast.error("Please Fill All Details");
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        registerField
      );

      toast.success(response.data?.message || "Registration successful!");

      setRegisterField({
        email: "",
        password: "",
        f_name: "",
      });

      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error("Registration Error:", err);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong!";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 px-4">
      {/* Background image with overlay */}
      <img
        src="../../../public/Assets/AttendenceBG.jpg"
        alt="College Attendance Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <Navbar />

      {/* SignUp card */}
      <div className="relative z-30 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full p-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
          Create Your Account
        </h1>

        <form
          className="space-y-6"
          onSubmit={handleRegister}
          autoComplete="off"
        >
          <div>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Full Name*
            </label>
            <input
              id="fullName"
              type="text"
              value={registerField.f_name}
              onChange={(e) => handleInputField(e, "f_name")}
              placeholder="Enter full name"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
              required
              autoComplete="name"
            />
          </div>

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
              value={registerField.email}
              onChange={(e) => handleInputField(e, "email")}
              placeholder="Enter college email"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
              required
              autoComplete="email"
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
              value={registerField.password}
              onChange={(e) => handleInputField(e, "password")}
              placeholder="Enter password"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-blue-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-semibold transition duration-300 shadow-lg"
          >
            Register
          </button>
        </form>

        <div className="flex items-center gap-3 my-6 text-gray-400">
          <hr className="flex-grow border-gray-600" />
          <span className="text-sm">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        <div className="mb-6">
          <GoogleLogin changeLoginValue={props.changeLoginValue} />
        </div>

        <p className="mt-3 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-600 font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>

      <div className="pb-1 mt-20">
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
