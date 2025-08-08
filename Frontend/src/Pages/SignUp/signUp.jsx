import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { motion } from "framer-motion";
import GoogleLoginComp from "../../components/GoogleLogin/googleLoginComp";
import { ToastContainer, toast } from "react-toastify";

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

      console.log(response);

      const msg = response.data?.message || "Registration successful!";
      toast.success(msg);

      // If response is successful
      //toast.success("Registration successful!");
      setRegisterField({
        email: "",
        password: "",
        f_name: "",
      });

      // Navigate after a short delay (optional)
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
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 overflow-hidden">
      {/* Sign Up Box */}
      <div className="relative z-10 w-full max-w-md bg-white shadow-2xl rounded-xl p-8 md:p-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-6">
          Make the most of your professional life
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm text-gray-600 mb-1"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={registerField.f_name}
              onChange={(e) => handleInputField(e, "f_name")}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={registerField.email}
              onChange={(e) => handleInputField(e, "email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={registerField.password}
              onChange={(e) => handleInputField(e, "password")}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            onClick={handleRegister}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-medium transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <div className="mb-4">
          <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already on LinedIn?
          <Link
            to="/login"
            className="text-blue-700 hover:underline ml-1 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
