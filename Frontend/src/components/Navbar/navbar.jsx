import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent px-6 md:px-20 py-4 flex justify-between items-center shadow-sm backdrop-blur-sm">
      {/* Logo and Brand */}
      <Link
        to="/"
        className="flex items-center gap-3 group"
        aria-label="Go to homepage"
      >
        <img
          src="/Assets/DYPIMED-Logo.png"
          alt="DYPIMED Logo"
          className="w-10 h-10 animate-bounce transition-transform duration-300 group-hover:scale-110"
        />
        <h3
          className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600
                     font-extrabold text-2xl md:text-3xl select-none
                     drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
        >
          DYPIMED
        </h3>
      </Link>

      {/* Right-side links */}
      <div className="flex items-center gap-4 md:gap-8">
        <Link
          to="/signUp"
          className="px-6 py-2 rounded-full text-sm md:text-base font-semibold
                     bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600
                     text-white shadow-lg hover:brightness-110 transition
                     drop-shadow-[0_0_6px_rgba(139,92,246,0.8)]"
        >
          Join Now
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 rounded-full text-sm md:text-base font-semibold
                     text-blue-600 border border-blue-600
                     hover:bg-blue-600 hover:text-white transition
                     drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
