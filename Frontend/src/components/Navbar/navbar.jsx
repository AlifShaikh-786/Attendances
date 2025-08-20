// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav
//       className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6 md:px-20 py-4 flex justify-between items-center shadow-sm backdrop-blur-sm"
//       role="navigation"
//       aria-label="Main navigation"
//     >
//       {/* Logo & Brand on the Left */}
//       <Link
//         to="/"
//         className="flex items-center gap-4 group"
//         aria-label="Go to homepage"
//       >
//         <img
//           src="/Assets/DYPIMED-Logo.png"
//           alt="DYPIMED Logo"
//           className="w-30 h-28 animate-bounce transition-transform duration-300 group-hover:scale-110"
//           loading="lazy"
//           draggable={false}
//         />
//         <h3
//           className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500
//              font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl select-none
//              drop-shadow-[0_0_8px_rgba(255,165,0,0.9)] leading-snug"
//         >
//           Dr. D.Y. Patil Institute of Management & Entrepreneur Development
//           <span className="block text-sm md:text-base font-semibold text-gray-200">
//             Varale, Pune
//           </span>
//         </h3>
//       </Link>

//       {/* Right-side buttons */}
//       <div className="flex items-center gap-4 md:gap-8">
//         <Link
//           to="/about"
//           className="px-5 py-2 rounded-full text-sm md:text-base font-semibold
//                text-white bg-gradient-to-r from-blue-500 to-purple-600
//                hover:from-blue-600 hover:to-purple-700
//                shadow-md shadow-purple-500/30
//                transition-all duration-300 transform hover:scale-105
//                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
//         >
//           About
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // get current route

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6 md:px-20 py-4 flex justify-between items-center shadow-sm backdrop-blur-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo & Brand on the Left */}
      <Link
        to="/"
        className="flex items-center gap-4 group"
        aria-label="Go to homepage"
      >
        <img
          src="/Assets/DYPIMED-Logo.png"
          alt="DYPIMED Logo"
          className="w-30 h-28 animate-bounce transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          draggable={false}
        />
        <h3
          className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500
             font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl select-none
             drop-shadow-[0_0_8px_rgba(255,165,0,0.9)] leading-snug"
        >
          Dr. D.Y. Patil Institute of Management & Entrepreneur Development
          <span className="block text-sm md:text-base font-semibold text-gray-200">
            Varale, Pune
          </span>
        </h3>
      </Link>

      {/* Right-side buttons */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Show About button only if NOT on /about */}
        {location.pathname !== "/about" && (
          <Link
            to="/about"
            className="px-5 py-2 rounded-full text-sm md:text-base font-semibold
                 text-white bg-gradient-to-r from-blue-500 to-purple-600
                 hover:from-blue-600 hover:to-purple-700
                 shadow-md shadow-purple-500/30
                 transition-all duration-300 transform hover:scale-105
                 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          >
            About
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
