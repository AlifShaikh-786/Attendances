// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import GoogleLogin from "../../components/GoogleLogin";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "../../components/Navbar/navbar";
// import Footer from "../../components/Footer/footer";

// const SignUp = (props) => {
//   const navigate = useNavigate();
//   const [registerField, setRegisterField] = useState({
//     email: "",
//     password: "",
//     f_name: "",
//   });

//   const handleInputField = (event, key) => {
//     setRegisterField({ ...registerField, [key]: event.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const { email, password, f_name } = registerField;

//     if (!email.trim() || !password.trim() || !f_name.trim()) {
//       return toast.error("Please fill all details");
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:7070/api/user/register",
//         registerField,
//         { withCredentials: true }
//       );

//       toast.success(response.data?.message || "Registration successful!");

//       setRegisterField({
//         email: "",
//         password: "",
//         f_name: "",
//       });

//       setTimeout(() => navigate("/login"), 1000);
//     } catch (err) {
//       console.error("Registration Error:", err);
//       const errorMsg =
//         err.response?.data?.error ||
//         err.response?.data?.message ||
//         "Something went wrong!";
//       toast.error(errorMsg);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col">
//       {/* Background */}
//       <img
//         src="../../../public/Assets/AttendenceBG.jpg"
//         alt="College Attendance Background"
//         className="fixed inset-0 w-full h-full object-cover brightness-50 -z-10"
//       />

//       <Navbar />

//       <main className="flex-grow flex items-center justify-center px-4 py-16 sm:py-24">
//         {/* SignUp card */}
//         <div className="relative z-20 bg-gray-900 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full p-10 sm:p-12">
//           <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400 tracking-wide drop-shadow-md">
//             Create Your Account
//           </h1>

//           <form
//             className="space-y-6"
//             onSubmit={handleRegister}
//             autoComplete="off"
//             noValidate
//           >
//             {/* Full Name */}
//             <div>
//               <label
//                 htmlFor="fullName"
//                 className="block mb-2 text-sm font-semibold text-gray-300"
//               >
//                 Full Name<span className="text-pink-500">*</span>
//               </label>
//               <input
//                 id="fullName"
//                 type="text"
//                 value={registerField.f_name}
//                 onChange={(e) => handleInputField(e, "f_name")}
//                 placeholder="Enter full name"
//                 className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 required
//                 autoComplete="name"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-semibold text-gray-300"
//               >
//                 Email Address<span className="text-pink-500">*</span>
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={registerField.email}
//                 onChange={(e) => handleInputField(e, "email")}
//                 placeholder="Enter college email"
//                 className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 required
//                 autoComplete="email"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-semibold text-gray-300"
//               >
//                 Password<span className="text-pink-500">*</span>
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={registerField.password}
//                 onChange={(e) => handleInputField(e, "password")}
//                 placeholder="Enter password"
//                 className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                 required
//                 autoComplete="new-password"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold shadow-lg transition duration-300"
//             >
//               Register
//             </button>
//           </form>

//           {/* OR separator */}
//           <div className="flex items-center gap-3 my-8 text-gray-400">
//             <hr className="flex-grow border-gray-600" />
//             <span className="text-sm select-none">or</span>
//             <hr className="flex-grow border-gray-600" />
//           </div>

//           {/* Google Login */}
//           {/* <div className="mb-6">
//             <GoogleLogin changeLoginValue={props.changeLoginValue} />
//           </div> */}

//           {/* Login link */}
//           <p className="mt-3 text-center text-gray-400">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-blue-400 hover:text-blue-600 font-semibold transition"
//             >
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </main>

//       <Footer />

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         pauseOnFocusLoss
//         theme="dark"
//       />
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
      return toast.error("Please fill all details");
    }

    try {
      // Use axios instance with credentials enabled
      const response = await axios.post(
        "http://localhost:7070/api/user/register",
        registerField,
        {
          withCredentials: true, // make sure cookies/headers are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data?.message || "Registration successful!");
      setRegisterField({ email: "", password: "", f_name: "" });
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
    <div className="relative min-h-screen flex flex-col">
      <img
        src="../../../public/Assets/AttendenceBG.jpg"
        alt="College Attendance Background"
        className="fixed inset-0 w-full h-full object-cover brightness-50 -z-10"
      />

      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="relative z-20 bg-gray-900 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full p-10 sm:p-12">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400 tracking-wide drop-shadow-md">
            Create Your Account
          </h1>

          <form
            className="space-y-6"
            onSubmit={handleRegister}
            autoComplete="off"
            noValidate
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-semibold text-gray-300"
              >
                Full Name<span className="text-pink-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={registerField.f_name}
                onChange={(e) => handleInputField(e, "f_name")}
                placeholder="Enter full name"
                className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-300"
              >
                Email Address<span className="text-pink-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={registerField.email}
                onChange={(e) => handleInputField(e, "email")}
                placeholder="Enter college email"
                className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-300"
              >
                Password<span className="text-pink-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={registerField.password}
                onChange={(e) => handleInputField(e, "password")}
                placeholder="Enter password"
                className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                autoComplete="new-password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold shadow-lg transition duration-300"
            >
              Register
            </button>
          </form>

          <div className="flex items-center gap-3 my-8 text-gray-400">
            <hr className="flex-grow border-gray-600" />
            <span className="text-sm select-none">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <p className="mt-3 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-600 font-semibold transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="dark"
      />
    </div>
  );
};

export default SignUp;
