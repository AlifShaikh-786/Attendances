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
  // const div = studentInfo?.div || "N/A";
  // const batch = studentInfo?.batch || "N/A";
  const email = studentInfo?.email || "Not provided";
  const contact = studentInfo?.contact || "Not provided";

  // Join name parts safely
  const fullName = [fname, mName, lname].filter(Boolean).join(" ");

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Gradient Card */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-1">
        <div className="bg-white rounded-2xl p-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
            🎓 Student Personal Information
          </h1>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition">
              <p className="text-sm text-gray-500">Roll No</p>
              <p className="font-semibold">{facultyId_id}</p>
            </div>

            <div className="p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{fullName || "N/A"}</p>
            </div>

            <div className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
              <p className="text-sm text-gray-500">Class</p>
              <p className="font-semibold">{department}</p>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition">
              <p className="text-sm text-gray-500">Semester</p>
              <p className="font-semibold">{subject}</p>
            </div>

            {/* <div className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
              <p className="text-sm text-gray-500">Division</p>
              <p className="font-semibold">{div}</p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
              <p className="text-sm text-gray-500">Batch</p>
              <p className="font-semibold">{batch}</p>
            </div> */}

            <div className="p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition col-span-2">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold break-words">{email}</p>
            </div>

            <div className="p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition col-span-2">
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-semibold">{contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFaculty;
