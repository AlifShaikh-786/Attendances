// import React from "react";
// import Navbar from "../../components/Navbar/navbar";
// import Footer from "../../components/Footer/footer";

// const LearnMore = () => {
//   return (
//     <>
//       {/* Navbar at top */}
//       <Navbar />

//       {/* Page Content */}
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center px-6 md:px-16 py-12 pt-40 mb-20">
//         {/* Heading */}
//         <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 text-center drop-shadow-lg">
//           DYPIMED Digital Attendance Management
//         </h1>

//         {/* Intro */}
//         <p className="mt-6 max-w-3xl text-center text-lg text-gray-700 leading-relaxed">
//           The{" "}
//           <span className="font-semibold">
//             Digital Attendance Management System
//           </span>{" "}
//           developed at{" "}
//           <span className="text-blue-600 font-bold">
//             Dr. D.Y. Patil Institute of Management & Entrepreneur Development
//             (DYPIMED), Varale, Pune
//           </span>{" "}
//           is a modern solution designed to simplify and automate attendance
//           tracking. It eliminates manual errors, enhances transparency, and
//           provides real-time insights for both students and faculty.
//         </p>

//         {/* Features Section */}
//         <div className="mt-10 grid md:grid-cols-2 gap-8 max-w-5xl">
//           <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
//             <h2 className="text-xl font-bold text-purple-700 mb-3">
//               📌 Key Features
//             </h2>
//             <ul className="list-disc list-inside text-gray-700 space-y-2">
//               <li>
//                 📱 Automated attendance using digital systems (Web & Mobile).
//               </li>
//               <li>🕒 Real-time attendance tracking and reports.</li>
//               <li>🔐 Secure login for students, faculty, and admin.</li>
//               <li>📊 Graphical representation of student performance.</li>
//               <li>📤 Export and manage attendance records easily.</li>
//             </ul>
//           </div>

//           <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
//             <h2 className="text-xl font-bold text-blue-600 mb-3">
//               🎯 Objectives
//             </h2>
//             <ul className="list-disc list-inside text-gray-700 space-y-2">
//               <li>✔️ Reduce paperwork and manual errors.</li>
//               <li>✔️ Save time for faculty and students.</li>
//               <li>✔️ Provide transparency in attendance management.</li>
//               <li>✔️ Support decision-making with accurate reports.</li>
//             </ul>
//           </div>
//         </div>

//         {/* Developed By Section */}
//         <div className="mt-16 max-w-5xl w-full">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
//             👨‍💻 Developed By
//           </h2>

//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Student 1 */}
//             <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition">
//               <img
//                 src="/Assets/Shoyab.jpg"
//                 alt="Shoyab Mulani"
//                 className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
//               />
//               <h3 className="mt-4 text-xl font-bold text-purple-700">
//                 Shoyab Mulani
//               </h3>
//               <p className="text-gray-600">MCA Student, DYPIMED</p>
//               <p className="text-gray-700">📞 +91-9579367009</p>
//               <p className="text-gray-700">✉️ shoyabmulani1@gmail.com</p>
//             </div>

//             {/* Student 2 */}
//             <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition">
//               <img
//                 src="/Assets/Alif.jpg"
//                 alt="Alif Shaikh"
//                 className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
//               />
//               <h3 className="mt-4 text-xl font-bold text-purple-700">
//                 Alif Shaikh
//               </h3>
//               <p className="text-gray-600">MCA Student, DYPIMED</p>
//               <p className="text-gray-700">📞 +91-8624932975</p>
//               <p className="text-gray-700">✉️ alifshaikh78600@gmail.com</p>
//             </div>
//           </div>
//         </div>

//         {/* Guide Section */}
//         <div className="mt-16 max-w-3xl w-full text-center">
//           <h2 className="text-2xl font-bold text-gray-800">
//             👩‍🏫 Under Guidance
//           </h2>

//           <div className="p-6 mt-6 bg-white rounded-2xl shadow-lg flex flex-col items-center hover:shadow-xl transition">
//             <img
//               src="/Assets/RizwanSir.jpg"
//               alt="Guide Teacher"
//               className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
//             />
//             <h3 className="mt-4 text-xl font-bold text-blue-600">
//               Prof. Dr. Rizwan Shaikh
//             </h3>
//             <p className="text-gray-600">Department of MCA, DYPIMED</p>
//             <p className="text-gray-700">📞 +91-9890457500</p>
//             <p className="text-gray-700">✉️ rizwan@gmail.com</p>
//           </div>
//         </div>
//       </div>

//       {/* Footer at bottom */}
//       <Footer />
//     </>
//   );
// };

// export default LearnMore;

import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
      {/* Navbar (fixed) */}
      <Navbar />

      {/* Content */}
      <main className="pt-40 md:pt-48 px-6 md:px-16 lg:px-24 pb-20">
        {/* Heading */}
        <section className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
            DYPIMED Digital Attendance Management
          </h1>
          <p className="mt-6 text-gray-200 text-lg max-w-4xl mx-auto">
            The{" "}
            <span className="font-semibold">
              Digital Attendance Management System
            </span>{" "}
            developed at{" "}
            <span className="text-yellow-300 font-bold">
              Dr. D.Y. Patil Institute of Management & Entrepreneur Development
              (DYPIMED), Varale, Pune
            </span>{" "}
            is a modern solution to simplify and automate attendance tracking.
            It eliminates manual errors, enhances transparency, and provides
            real-time insights for students and faculty.
          </p>
        </section>

        {/* Features + Objectives */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition">
            <h2 className="text-xl font-bold text-yellow-300 mb-3">
              📌 Key Features
            </h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>📱 Automated attendance (Web & Mobile).</li>
              <li>🕒 Real-time tracking & reports.</li>
              <li>🔐 Secure login for all users.</li>
              <li>📊 Graphical student performance.</li>
              <li>📤 Easy export & record management.</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition">
            <h2 className="text-xl font-bold text-cyan-300 mb-3">
              🎯 Objectives
            </h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>✔️ Reduce paperwork & errors.</li>
              <li>✔️ Save time for faculty & students.</li>
              <li>✔️ Ensure transparency in management.</li>
              <li>✔️ Provide accurate reports for decisions.</li>
            </ul>
          </div>
        </section>

        {/* Developed By */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold text-center mb-8">
            👨‍💻 Developed By
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Shoyab Mulani",
                img: "/Assets/Shoyab.jpg",
                phone: "+91-9579367009",
                email: "shoyabmulani1@gmail.com",
              },
              {
                name: "Alif Shaikh",
                img: "/Assets/Alif.jpg",
                phone: "+91-8624932975",
                email: "alifshaikh78600@gmail.com",
              },
            ].map((s) => (
              <div
                key={s.name}
                className="bg-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition"
              >
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                />
                <h3 className="mt-4 text-xl font-bold text-yellow-300">
                  {s.name}
                </h3>
                <p className="text-gray-300">MCA Student, DYPIMED</p>
                <p className="text-gray-200">📞 {s.phone}</p>
                <p className="text-gray-200">✉️ {s.email}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Guide Section */}
        <section className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-2xl font-extrabold mb-6">👩‍🏫 Under Guidance</h2>
          <div className="bg-white/5 rounded-2xl p-6 flex flex-col items-center hover:bg-white/10 transition">
            <img
              src="/Assets/RizwanSir.jpg"
              alt="Guide Teacher"
              className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400"
            />
            <h3 className="mt-4 text-xl font-bold text-cyan-300">
              Prof. Dr. Rizwan Shaikh
            </h3>
            <p className="text-gray-300">Department of MCA, DYPIMED</p>
            <p className="text-gray-200">📞 +91-9890457500</p>
            <p className="text-gray-200">✉️ rizwan@gmail.com</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LearnMore;
