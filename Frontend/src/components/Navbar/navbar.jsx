import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-purple-950 backdrop-blur-lg shadow-md px-6 md:px-16 py-3 flex justify-between items-center"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* ✅ Left Section - Two Logos */}
      <div className="flex items-center gap-6">
        {/* First Image */}
        <div>
          <img
            src="/Assets/DYPatil.jpg"
            alt="DY Patil Logo"
            className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-md hover:scale-105 transition-transform duration-300"
            loading="lazy"
            draggable={false}
          />
          <p className="pt-1 pl-3 text-pretty">Dr. D.Y. Patil</p>
        </div>
        {/* Second Logo & Full Name */}
        <Link to="/" className="flex items-center gap-4 group">
          <img
            src="/Assets/DYPIMED-Logo.png"
            alt="DYPIMED Logo"
            className="w-20 h-20 md:w-28 md:h-28 object-contain hover:scale-105 transition-transform duration-300"
            loading="lazy"
            draggable={false}
          />
          <div>
            <h3 className="text-yellow-500 font-bold text-2xl pb-2 flex justify-center">
              Dr. D.Y. Patil Educational Federation's
            </h3>
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 font-extrabold leading-snug whitespace-nowrap">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-[26px] text-white">
                Dr. D.Y. Patil Institute of Management & Entrepreneur
                Development <br></br>
                <span className="flex justify-center">Varale, Pune</span>
              </span>
            </h3>
          </div>
        </Link>
      </div>

      {/* ✅ Right Section - Two Images */}
      <div className="flex items-center gap-6 md:gap-10">
        <div>
          <img
            src="/Assets/SushsantSir.jpg"
            alt="Sir"
            className="w-16 h-16 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-md hover:scale-110 transition-transform duration-300"
            loading="lazy"
            draggable={false}
          />
          <p>Dr. Sushant Patil</p>
        </div>
        <div>
          <img
            src="/Assets/Mam.jpg"
            alt="Mam"
            className="w-16 h-16 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-md hover:scale-110 transition-transform duration-300"
            loading="lazy"
            draggable={false}
          />
          <p>Adv. Anuja Patil</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
