// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import GoogleLogin from "../../components/GoogleLogin/googleLogin"; // <-- uncomment and fix import
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const Login = (props) => {
//   const navigate = useNavigate();
//   const [loginField, setLoginField] = useState({ email: "", password: "" });

//   const onChangeInput = (event, key) => {
//     setLoginField({ ...loginField, [key]: event.target.value });
//   };

//   const handleLogin = async () => {
//     if (
//       loginField.email.trim().length === 0 ||
//       loginField.password.trim().length === 0
//     ) {
//       return toast.error("Please fill all credentials");
//     }
//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/auth/login",
//         loginField,
//         { withCredentials: true }
//       );
//       localStorage.setItem("isLogin", "true");
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userInfo", JSON.stringify(res.data.userExist));
//       navigate("/feeds");
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 md:p-10">
//         <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-6">
//           Sign In
//         </h2>

//         <div className="mb-6">
//           <GoogleLogin changeLoginValue={props.changeLoginValue} />
//         </div>

//         <div className="flex items-center gap-3 my-6">
//           <hr className="flex-grow border-gray-300" />
//           <span className="text-gray-500 text-sm">or</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         <form
//           className="space-y-4"
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleLogin();
//           }}
//         >
//           <div>
//             <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={loginField.email}
//               onChange={(e) => onChangeInput(e, "email")}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//               autoComplete="email"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm text-gray-600 mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={loginField.password}
//               onChange={(e) => onChangeInput(e, "password")}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//               autoComplete="current-password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-medium transition duration-200"
//           >
//             Sign In
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           New to LinkedIn?
//           <Link
//             to="/signUp"
//             className="text-blue-700 hover:underline ml-1 font-medium"
//           >
//             Join Now
//           </Link>
//         </p>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/GoogleLogin/googleLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

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
        "http://localhost:7070/api/faculty/login",
        loginField,
        { withCredentials: true }
      );
      //props.changeLoginValue(true);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.userExist));
      // localStorage.setItem("token", token);
      navigate("/facultyDashboard");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Login failed");
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

      {/* College Logo top-left */}
      {/* <div className="absolute top-6 left-6 z-20">
        <img
          src="../../../public/Assets/DYPIMED-Logo.png"
          alt="College Logo"
          className="w-20 h-20 object-contain"
        />
      </div> */}

      {/* Login card */}
      <div className="relative z-30 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full p-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
          DYPIMED
        </h1>
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
          Faculty Login
        </h1>

        {/* <div className="mb-6">
          <GoogleLogin changeLoginValue={props.changeLoginValue} />
        </div> */}

        <div className="flex items-center gap-3 my-6 text-gray-400">
          <hr className="flex-grow border-gray-600" />
          <span className="text-sm">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>

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
              placeholder="Enter college email"
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

        {/* <p className="mt-3 text-center text-gray-400">
          New to the system?{" "}
          <Link
            to="/signUp"
            className="text-blue-400 hover:text-blue-600 font-semibold"
          >
            Register Here
          </Link>
        </p> */}
      </div>

      <div className="pb-10">
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
