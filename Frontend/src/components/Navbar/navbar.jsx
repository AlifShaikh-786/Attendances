import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate and close dropdown
  const onNavigate = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6 md:px-20 py-4 flex justify-between items-center shadow-sm backdrop-blur-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo & Brand */}
      <Link
        to="/"
        className="flex items-center gap-3 group"
        aria-label="Go to homepage"
      >
        <img
          src="/Assets/DYPIMED-Logo.png"
          alt="DYPIMED Logo"
          className="w-10 h-10 animate-bounce transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          draggable={false}
        />
        <h3
          className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600
                     font-extrabold text-2xl md:text-3xl select-none
                     drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
        >
          DYPIMED
        </h3>
      </Link>

      {/* Right-side buttons */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Join Now */}
        {/* <Link
          to="/signUp"
          className="px-6 py-2 rounded-full text-sm md:text-base font-semibold
    bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600
    text-white shadow-lg hover:brightness-110 transition
    drop-shadow-[0_0_6px_rgba(139,92,246,0.8)] focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
        >
          Join Now
        </Link> */}

        {/* Sign In Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-controls="signin-menu"
            className="px-6 py-2 rounded-full text-sm md:text-base font-semibold
                       text-blue-600 border border-blue-600
                       hover:bg-blue-600 hover:text-white transition
                       drop-shadow-[0_0_6px_rgba(59,130,246,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                       flex items-center"
          >
            Sign In
            <svg
              className={`ml-2 h-4 w-4 transition-transform duration-300 ${
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
            </svg>
          </button>

          {dropdownOpen && (
            <div
              id="signin-menu"
              role="menu"
              aria-label="Sign In options"
              className="absolute right-0 mt-2 w-44 rounded-xl shadow-2xl ring-1 ring-black ring-opacity-10 focus:outline-none z-50"
            >
              <button
                onClick={() => onNavigate("/adminLogin")}
                className="block w-full text-center px-5 py-3 mb-2 text-white font-semibold rounded-full
                           bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400
                           hover:from-pink-600 hover:via-red-600 hover:to-yellow-500
                           transition duration-300 shadow-lg
                           focus:outline-none focus:ring-4 focus:ring-pink-300"
                role="menuitem"
                tabIndex={0}
              >
                Admin
              </button>
              <button
                onClick={() => onNavigate("/login")}
                className="block w-full text-center px-5 py-3 mb-2 text-white font-semibold rounded-full
                           bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400
                           hover:from-pink-600 hover:via-red-600 hover:to-yellow-500
                           transition duration-300 shadow-lg
                           focus:outline-none focus:ring-4 focus:ring-pink-300"
                role="menuitem"
                tabIndex={0}
              >
                Faculty
              </button>
              <button
                onClick={() => onNavigate("/studentLogin")}
                className="block w-full text-center px-5 py-3 mb-2 text-white font-semibold rounded-full
                           bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400
                           hover:from-pink-600 hover:via-red-600 hover:to-yellow-500
                           transition duration-300 shadow-lg
                           focus:outline-none focus:ring-4 focus:ring-pink-300"
                role="menuitem"
                tabIndex={0}
              >
                Student
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
