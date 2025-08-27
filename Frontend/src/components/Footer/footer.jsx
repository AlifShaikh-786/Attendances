import React from "react";

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0 z-40 bg-transparent backdrop-blur-sm shadow-sm py-4 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2 items-center cursor-pointer select-none">
          <h3
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600
                     font-extrabold text-2xl md:text-3xl select-none
                     drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
          >
            DYPIMED
          </h3>
        </div>

        <div
          className="text-sm text-white drop-shadow-[0_0_4px_rgba(59,130,246,0.8)] select-none"
          aria-label="Copyright"
        >
          <p>
            © {new Date().getFullYear()} DYPIMED Digital Attendance Management |
            Built with ❤️ by Alif & Shoyab
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
