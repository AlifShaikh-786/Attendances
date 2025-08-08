// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../../components/Navbar/navbar";

// const LandingPage = () => {
//   return (
//     <div className="relative min-h-screen bg-blue-50 overflow-hidden">
//       {/* Navbar at the top */}
//       <Navbar />

//       {/* Top Wave SVG */}
//       <div className="absolute top-0 left-0 w-full z-0 mt-20">
//         <svg viewBox="0 0 1440 320" className="w-full h-[150px]">
//           <path
//             fill="#3b82f6"
//             fillOpacity="1"
//             d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,154.7C672,160,768,128,864,106.7C960,85,1056,75,1152,96C1248,117,1344,171,1392,197.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
//           ></path>
//         </svg>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 pt-10 md:pt-20 mt-5">
//         {/* Left Section */}
//         <div className="md:w-1/2 w-full text-center md:text-left space-y-6">
//           <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
//             Welcome to Your <br /> DYPIMED Attendance Management
//           </h1>

//           {/* Sign in button */}
//           <div className="space-y-4">
//             <Link
//               to={"/login"}
//               className="flex items-center justify-center gap-3 w-[80%] mx-auto md:mx-0 py-3 border-2 rounded-full text-blue-700 border-blue-700 bg-white hover:bg-blue-50 transition-all"
//             >
//               <img
//                 src="https://static.vecteezy.com/system/resources/previews/048/116/360/non_2x/gmail-email-logo-icon-free-png.png"
//                 alt="Email"
//                 className="w-7 h-7"
//               />
//               Sign in with Email
//             </Link>
//           </div>

//           <p className="text-sm text-gray-500 w-[80%] mx-auto md:mx-0">
//             By continuing, you agree to our{" "}
//             <span className="underline text-blue-700">User Agreement</span>,{" "}
//             <span className="underline text-blue-700">Privacy Policy</span>, and{" "}
//             <span className="underline text-blue-700">Cookie Policy</span>.
//           </p>

//           <Link
//             to={"/signUp"}
//             className="block text-center md:text-left text-blue-700 hover:underline"
//           >
//             New to DYPIMED? Join Now
//           </Link>
//         </div>

//         {/* Right Image */}
//         <div className="md:w-1/2 w-full mt-10 md:mt-0 flex justify-center z-10">
//           <img
//             src="/Assets/DYPIMED.jpg"
//             alt="DYPIMED illustration"
//             className="w-[80%] h-auto object-contain drop-shadow-2xl"
//           />
//         </div>
//       </div>

//       {/* Bottom Wave SVG */}
//       <div className="absolute bottom-0 left-0 w-full z-0">
//         <svg viewBox="0 0 1440 320" className="w-full h-[120px]">
//           <path
//             fill="#3b82f6"
//             fillOpacity="1"
//             d="M0,288L48,261.3C96,235,192,181,288,181.3C384,181,480,235,576,229.3C672,224,768,160,864,128C960,96,1056,96,1152,106.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//           ></path>
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#5B21B6]">
      {/* Fixed background color */}
      {/* Removed animated gradient background */}

      {/* Floating colorful circles */}
      <div className="absolute -z-10 top-10 left-10 w-40 h-40 bg-pink-300 rounded-full opacity-50 animate-floatSlow" />
      <div className="absolute -z-10 top-1/2 right-20 w-60 h-60 bg-purple-400 rounded-full opacity-40 animate-floatFast" />
      <div className="absolute -z-10 bottom-10 left-1/3 w-52 h-52 bg-blue-400 rounded-full opacity-30 animate-floatSlow delay-2000" />

      {/* Extra animated shapes */}
      <div className="absolute -z-10 top-20 right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-30 animate-spinSlow" />
      <div className="absolute -z-10 bottom-32 left-5 w-24 h-24 bg-pink-400 rounded-lg opacity-40 animate-pulseSlow" />
      <div className="absolute -z-10 top-1/3 left-1/4 w-20 h-20 bg-green-400 rounded-[20%] opacity-20 animate-bounceSlow" />

      {/* Navbar */}
      <Navbar />

      {/* Top Gradient Wave */}
      <div className="absolute top-0 left-0 w-full z-0 mt-20">
        <svg viewBox="0 0 1440 320" className="w-full h-[160px]">
          <path
            fill="url(#topGradient)"
            fillOpacity="1"
            d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,154.7C672,160,768,128,864,106.7C960,85,1056,75,1152,96C1248,117,1344,171,1392,197.3L1440,224V0H0Z"
          ></path>
          <defs>
            <linearGradient id="topGradient" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#3b82f6" />
              <stop offset="0.5" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 pt-12 md:pt-20 mt-5 pb-24">
        {/* Left Section */}
        <div className="md:w-1/2 w-full text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-snug drop-shadow-lg">
            Welcome to <br /> DYPIMED Attendance Management
          </h1>

          {/* Sign in button */}
          <div className="space-y-4">
            <Link
              to={"/login"}
              className="flex items-center justify-center gap-3 w-[80%] mx-auto md:mx-0 py-3 border-2 rounded-full text-blue-700 border-blue-700 bg-white hover:shadow-lg hover:scale-105 transition-all"
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/048/116/360/non_2x/gmail-email-logo-icon-free-png.png"
                alt="Email"
                className="w-7 h-7"
              />
              Sign in with Email
            </Link>
          </div>

          <p className="text-sm text-gray-100 w-[80%] mx-auto md:mx-0">
            By continuing, you agree to our{" "}
            <span className="underline text-blue-200 cursor-pointer">
              User Agreement
            </span>
            ,{" "}
            <span className="underline text-blue-200 cursor-pointer">
              Privacy Policy
            </span>
            , and{" "}
            <span className="underline text-blue-200 cursor-pointer">
              Cookie Policy
            </span>
            .
          </p>

          <Link
            to={"/signUp"}
            className="block text-center md:text-left text-purple-200 font-semibold hover:underline"
          >
            New to DYPIMED? Join Now
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full mt-10 md:mt-0 flex justify-center z-10">
          <img
            src="/Assets/DYPIMED.jpg"
            alt="DYPIMED illustration"
            className="w-full max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto object-cover drop-shadow-2xl transition-transform duration-300 hover:scale-105 rounded-tl-[80px] rounded-br-[80px]"
            style={{
              clipPath: "ellipse(75% 100% at 50% 50%)",
            }}
          />
        </div>
      </div>

      {/* Bottom Gradient Wave */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-[140px]">
          <path
            fill="url(#bottomGradient)"
            fillOpacity="1"
            d="M0,288L48,261.3C96,235,192,181,288,181.3C384,181,480,235,576,229.3C672,224,768,160,864,128C960,96,1056,96,1152,106.7C1248,117,1344,139,1392,149.3L1440,160V320H0Z"
          ></path>
          <defs>
            <linearGradient id="bottomGradient" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#ec4899" />
              <stop offset="0.5" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Footer */}
      <div className="pb-24">
        <Footer />
      </div>

      {/* Tailwind Animation Styles */}
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

        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spinSlow {
          animation: spinSlow 20s linear infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-pulseSlow {
          animation: pulseSlow 6s ease-in-out infinite;
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounceSlow {
          animation: bounceSlow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
