import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginComp from "../../components/GoogleLogin/googleLoginComp";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = (props) => {
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
    console.log(loginField);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        loginField,
        { withCredentials: true }
      );
      //props.changeLoginValue(true);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.userExist));
      // localStorage.setItem("token", token);
      navigate("/feeds");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        <div className="mb-6">
          <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
        </div>

        <div className="flex items-center gap-3 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={loginField.email}
              onChange={(e) => onChangeInput(e, "email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              autoComplete="email"
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
              value={loginField.password}
              onChange={(e) => onChangeInput(e, "password")}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              autoComplete="current-password"
            />
          </div>

          <div
            onClick={handleLogin}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleLogin();
            }}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-medium transition duration-200 text-center cursor-pointer"
          >
            Sign In
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          New to LinedIn?
          <Link
            to="/signUp"
            className="text-blue-700 hover:underline ml-1 font-medium"
          >
            Join Now
          </Link>
        </p>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;
