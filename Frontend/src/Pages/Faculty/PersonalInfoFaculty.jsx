import React from "react";

const PersonalInfoFaculty = () => {
  // Safely parse localStorage data
  let studentInfo = {};
  try {
    studentInfo = JSON.parse(localStorage.getItem("studentInfo")) || {};
  } catch (err) {
    console.error("Invalid studentInfo in localStorage:", err);
    studentInfo = {};
  }

  const facultyId_id = studentInfo?.facultyId_id || "N/A";
  const fname = studentInfo?.fName || "";
  const mName = studentInfo?.mName || "";
  const lname = studentInfo?.lName || "";
  const department = studentInfo?.department || "N/A";
  const subject = studentInfo?.subject || "N/A";
  const email = studentInfo?.email || "Not provided";
  const contact = studentInfo?.contact || "Not provided";

  const fullName = [fname, mName, lname].filter(Boolean).join(" ") || "N/A";

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gradient bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-8 animate-pulse">
          🎓 Faculty Information
        </h2>

        <div className="space-y-6 text-gray-700">
          {/* Faculty ID */}
          <div className="flex flex-col">
            <span className=" uppercase font-bold tracking-wide">
              Faculty ID
            </span>
            <span className="text-lg text-gray-800">{facultyId_id}</span>
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <span className="text-sm font-bold   uppercase tracking-wide">
              Name
            </span>
            <span className=" text-lg text-gray-800">{fullName}</span>
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <span className="text-sm font-bold  uppercase tracking-wide">
              Department
            </span>
            <span className=" text-lg text-gray-800">{department}</span>
          </div>

          {/* Subject */}
          <div className="flex flex-wrap gap-2 flex-col ">
            <div className="flex flex-col">
              <span className="text-sm font-bold  uppercase tracking-wide">
                Subjects
              </span>
            </div>
            <div className="flex flex-wrap gap-2  ">
              {subject.map((sub, index) => (
                <span
                  key={index}
                  className="px-3 py-1  text-black rounded-full text-sm"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <span className="text-sm font-bold  uppercase tracking-wide">
              Email
            </span>
            <span className=" text-lg text-gray-800 break-words">{email}</span>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <span className="text-sm font-bold  uppercase tracking-wide">
              Contact
            </span>
            <span className=" text-lg text-gray-800">{contact}</span>
          </div>
        </div>

        {/* <div className="mt-8  flex justify-center">
          <button className="px-6 py-2 font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
            Contact Faculty
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PersonalInfoFaculty;
