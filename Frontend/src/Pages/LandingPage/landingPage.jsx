// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar/navbar";
// import Footer from "../../components/Footer/footer";

// const LandingPage = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   // Close dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     const handleEsc = (event) => {
//       if (event.key === "Escape") setDropdownOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEsc);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEsc);
//     };
//   }, []);

//   // Navigate and close dropdown
//   const onNavigate = (path) => {
//     setDropdownOpen(false);
//     navigate(path);
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
//       {/* Background Floating Circles */}
//       <div className="absolute -z-10 top-10 left-10 w-40 h-40 bg-pink-400 rounded-full opacity-40 blur-2xl animate-floatSlow" />
//       <div className="absolute -z-10 top-1/2 right-20 w-60 h-60 bg-purple-500 rounded-full opacity-30 blur-2xl animate-floatFast" />
//       <div className="absolute -z-10 bottom-10 left-1/3 w-52 h-52 bg-blue-500 rounded-full opacity-30 blur-2xl animate-floatSlow delay-2000" />

//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <div
//         className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16
//                 pt-40 md:pt-48 pb-32 gap-10"
//       >
//         {/* Left Content */}
//         <div className="md:w-1/2 w-full text-center md:text-left space-y-8">
//           <h1 className="text-2xl md:text-3xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg break-words">
//             Welcome to{" "}
//             <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               AI Powered
//             </span>
//             <br />
//             Attendance Management System
//           </h1>

//           <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0">
//             A modern, secure and smart way to manage student attendance with
//             face recognition and automated reports.
//           </p>

//           <div
//             className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center md:justify-start relative"
//             ref={dropdownRef}
//           >
//           <div
//   className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center md:justify-start relative"
//   ref={dropdownRef}
// >
//   {/* ✅ Common Button Styles */}
//   const buttonClasses = `
//     relative px-6 py-3 rounded-lg text-sm md:text-base font-semibold text-white
//     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
//     hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
//     shadow-md transition-all duration-300
//     focus:outline-none focus:ring-2 focus:ring-purple-400
//   `;

//   {/* Get Started Button with Dropdown */}
//   <button
//     onClick={() => setDropdownOpen((open) => !open)}
//     aria-haspopup="true"
//     aria-expanded={dropdownOpen}
//     aria-controls="signin-menu"
//     className={buttonClasses + " flex items-center gap-2"}
//   >
//     Get Started
//     <svg
//       className={`h-5 w-5 transform transition-transform duration-300 ${
//         dropdownOpen ? "rotate-180" : ""
//       }`}
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M19 9l-7 7-7-7"
//       />
//     </svg>
//   </button>

//   {dropdownOpen && (
//     <div
//       id="signin-menu"
//       role="menu"
//       aria-label="Sign In options"
//       className="absolute left-0 bottom-full mb-3 w-44 bg-white rounded-xl shadow-xl overflow-hidden animate-fadeSlide z-50"
//     >
//       <button
//         onClick={() => onNavigate("/studentLogin")}
//         className="block w-full px-5 py-3 text-gray-800 font-semibold hover:bg-pink-100 transition"
//         role="menuitem"
//       >
//         Log In
//       </button>
//     </div>
//   )}

//   {/* Learn More Button */}
//   <Link to="/learnMore" className={buttonClasses}>
//     Learn More
//   </Link>

//   {/* About Button */}
//   {location.pathname !== "/about" && (
//     <Link to="/about" className={buttonClasses}>
//       About
//     </Link>
//   )}
// </div>

//       </div>

//       {/* Footer */}
//       <Footer />

//       {/* Animations */}
//       <style>{`
//         @keyframes floatSlow {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-15px); }
//         }
//         .animate-floatSlow {
//           animation: floatSlow 6s ease-in-out infinite;
//         }
//         @keyframes floatFast {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-25px); }
//         }
//         .animate-floatFast {
//           animation: floatFast 4s ease-in-out infinite;
//         }
//         @keyframes fadeSlide {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeSlide {
//           animation: fadeSlide 0.25s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LandingPage;

// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar/navbar";
// import Footer from "../../components/Footer/footer";

// const LandingPage = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   // Close dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Navigate and close dropdown
//   const onNavigate = (path) => {
//     setDropdownOpen(false);
//     navigate(path);
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
//       {/* Background Floating Circles */}
//       <div className="absolute -z-10 top-10 left-10 w-40 h-40 bg-pink-400 rounded-full opacity-40 blur-2xl animate-floatSlow" />
//       <div className="absolute -z-10 top-1/2 right-20 w-60 h-60 bg-purple-500 rounded-full opacity-30 blur-2xl animate-floatFast" />
//       <div className="absolute -z-10 bottom-10 left-1/3 w-52 h-52 bg-blue-500 rounded-full opacity-30 blur-2xl animate-floatSlow delay-2000" />

//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       {/* Hero Section */}
//       <div
//         className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16
//                 pt-40 md:pt-48 pb-32 gap-10"
//       >
//         {/* Left Content */}
//         <div className="md:w-1/2 w-full text-center md:text-left space-y-8">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
//             Welcome to{" "}
//             <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Dr. DY Patil Institute
//             </span>
//             <br />
//             Attendance Management System
//           </h1>

//           <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0">
//             A modern, secure and smart way to manage student attendance with
//             face recognition and automated reports.
//           </p>

//           <div
//             className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center md:justify-start relative"
//             ref={dropdownRef}
//           >
//             {/* Get Started Button with Dropdown */}
//             <button
//               onClick={() => setDropdownOpen((open) => !open)}
//               aria-haspopup="true"
//               aria-expanded={dropdownOpen}
//               aria-controls="signin-menu"
//               className={`relative px-7 py-3 rounded-full text-sm md:text-base font-semibold
//                           text-white bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600
//                           hover:from-pink-600 hover:via-purple-700 hover:to-blue-700
//                           shadow-lg shadow-purple-500/40 transition-all duration-300
//                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
//                           flex items-center gap-2 group transform hover:scale-105`}
//             >
//               Get Started
//               <svg
//                 className={`h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1 ${
//                   dropdownOpen ? "rotate-180" : ""
//                 }`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//               {/* Gradient Glow Border */}
//               <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 blur opacity-60 group-hover:opacity-100 transition"></span>
//             </button>

//             {dropdownOpen && (
//               <div
//                 id="signin-menu"
//                 role="menu"
//                 aria-label="Sign In options"
//                 className="absolute left-0 mt-3 w-44 bg-white rounded-xl shadow-xl overflow-hidden animate-fadeSlide z-50"
//               >
//                 <button
//                   onClick={() => onNavigate("/adminLogin")}
//                   className="block w-full px-5 py-3 text-gray-800 font-semibold hover:bg-pink-100 transition"
//                   role="menuitem"
//                 >
//                   Admin
//                 </button>
//                 <button
//                   onClick={() => onNavigate("/login")}
//                   className="block w-full px-5 py-3 text-gray-800 font-semibold hover:bg-pink-100 transition"
//                   role="menuitem"
//                 >
//                   Faculty
//                 </button>
//                 <button
//                   onClick={() => onNavigate("/studentLogin")}
//                   className="block w-full px-5 py-3 text-gray-800 font-semibold hover:bg-pink-100 transition"
//                   role="menuitem"
//                 >
//                   Student
//                 </button>
//               </div>
//             )}

//             {/* Learn More Button */}
//             <Link
//               to="/learnMore"
//               className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-semibold shadow-md hover:bg-white/20 transition"
//             >
//               Learn More
//             </Link>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="md:w-1/2 w-full flex justify-center">
//           <img
//             src="/Assets/DYPIMED.jpg"
//             alt="DYPIMED Campus"
//             className="w-full max-w-[550px] rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
//           />
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />

//       {/* Animations */}
//       <style>{`
//         @keyframes floatSlow {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-15px); }
//         }
//         .animate-floatSlow {
//           animation: floatSlow 6s ease-in-out infinite;
//         }
//         @keyframes floatFast {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-25px); }
//         }
//         .animate-floatFast {
//           animation: floatFast 4s ease-in-out infinite;
//         }
//         @keyframes fadeSlide {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeSlide {
//           animation: fadeSlide 0.25s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LandingPage;

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import StudentLogin from "../Login/studentLogin";

const LandingPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown if clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleEsc = (event) => {
      if (event.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const uploads = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Navigate and close dropdown
  const onNavigate = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  // ✅ Common Button Styles
  const buttonClasses = `
    relative px-6 py-3 rounded-lg text-sm md:text-base font-semibold text-white
    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
    hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
    shadow-md transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-purple-400
  `;

  return (
    <div className="relative min-h-screen overflow-hidden bg-purple-400 text-white">
      {/* Background Floating Circles */}
      <div className="absolute -z-10 top-10 left-10 w-40 h-40 bg-purple-400 rounded-full opacity-40 blur-2xl animate-floatSlow" />
      <div className="absolute -z-10 top-1/2 right-20 w-60 h-60 bg-purple-400 rounded-full opacity-30 blur-2xl animate-floatFast" />
      <div className="absolute -z-10 bottom-10 left-1/3 w-52 h-52 bg-purple-400 rounded-full opacity-30 blur-2xl animate-floatSlow delay-2000" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 
                pt-40 md:pt-48 pb-32 gap-10 bg-purple-400"
      >
        {/* Left Content */}
        <div className="md:w-1/2 w-full text-center md:text-left space-y-8">
          <div className="text-black pt-7 gap-2">
            <div className="">
              <h1 className="flex pb-2 justify-center text-lg md:text-3xl lg:text-5xl font-extrabold pb-1 leading-tight drop-shadow-lg break-words ">
                Welcome to {"  "}
                <span className="bg-gradient-to-r pl-2 pr-2  from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  AI
                </span>
                <span className="bg-gradient-to-r from-blue-600 via-purple5400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Powered
                </span>
                <br />
              </h1>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="flex pt-2  justify-center text-lg md:text-3xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg break-words ">
                Attendance Management
              </h1>
              <h1 className="flex justify-center pt-2 text-lg md:text-3xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg break-words ">
                System
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center pl-16">
            <p className="flex flex-col justify-center items-center pt-5  text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0">
              A modern, secure and smart way to manage student attendance{" "}
              <span>with face recognition and automated reports.</span>
            </p>
          </div>

          {/* Buttons Section */}
          <div
            className="flex flex-col pl-32 pt-5 md:flex-row gap-4 md:gap-6 justify-center md:justify-start relative"
            ref={dropdownRef}
          >
            {/* Get Started Button with Dropdown */}
            <button
              onClick={uploads}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-controls="signin-menu"
              className={buttonClasses + " flex items-center gap-2"}
            >
              Get Started
              {/* <svg
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg> */}
            </button>
            {/* Modal for Student Login */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto"
                onClick={closeModal}
              >
                <div
                  className=" rounded-xl max-w-96 h-md w-full p-6 relative "
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 mt-52 text-black hover:text-gray-700 text-xl font-bold"
                  >
                    ✕
                  </button>
                  <StudentLogin />
                </div>
              </div>
            )}

            {/* Dropdown Menu */}
            {/* {dropdownOpen && (
              <div
                id="signin-menu"
                role="menu"
                aria-label="Sign In options"
                className="absolute left-0 bottom-full mb-3 w-44 bg-white rounded-xl shadow-xl overflow-hidden animate-fadeSlide z-50"
              >
                <button
                  onClick={() => onNavigate("/studentLogin")}
                  className="block w-full px-5 py-3 text-gray-800 font-semibold hover:bg-pink-100 transition"
                  role="menuitem"
                >
                  Log In
                </button>
              </div>
            )} */}

            {/* Learn More Button */}
            <Link to="/learnMore" className={buttonClasses}>
              Learn More
            </Link>

            {/* About Button */}
            {location.pathname !== "/about" && (
              <Link to="/about" className={buttonClasses}>
                About
              </Link>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src="/Assets/DYPIMED.jpg"
            alt="DYPIMED Campus"
            loading="lazy"
            className="w-full max-w-[550px] rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-floatSlow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        .animate-floatFast {
          animation: floatFast 4s ease-in-out infinite;
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlide {
          animation: fadeSlide 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
