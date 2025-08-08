// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const DashboardProfile = () => {
//   const [profile, setProfile] = useState({
//     f_name: "",
//     email: "",
//     department: "MCA", // default to MCA
//     yearOfStudy: "1",
//     semester: "1",
//     phone: "",
//     photo: null, // store File object here
//     photoPreviewUrl: "", // store preview URL
//   });
//   const [loading, setLoading] = useState(false);

//   // Fetch profile data on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:4000/api/profile/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = res.data;
//         setProfile((prev) => ({
//           ...prev,
//           f_name: data.f_name || "",
//           email: data.email || "",
//           department: data.department || "MCA",
//           yearOfStudy: data.yearOfStudy || "1",
//           semester: data.semester || "1",
//           phone: data.phone || "",
//           photoPreviewUrl: data.photoUrl || "", // assuming API returns URL of photo
//         }));
//       } catch (err) {
//         toast.error("Failed to load profile data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle photo input change
//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfile((prev) => ({
//         ...prev,
//         photo: file,
//         photoPreviewUrl: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!profile.f_name || !profile.email) {
//       toast.error("Full Name and Email are required.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       // Prepare form data for multipart/form-data upload (for photo)
//       const formData = new FormData();
//       formData.append("f_name", profile.f_name);
//       formData.append("email", profile.email);
//       formData.append("department", profile.department);
//       formData.append("yearOfStudy", profile.yearOfStudy);
//       formData.append("semester", profile.semester);
//       formData.append("phone", profile.phone);
//       if (profile.photo) {
//         formData.append("photo", profile.photo);
//       }

//       await axios.put("http://localhost:4000/api/profile/update", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       toast.error("Update failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg text-gray-100">
//       <h2 className="text-3xl font-bold mb-6 text-blue-400">Your Profile</h2>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading...</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Full Name */}
//           <div>
//             <label
//               htmlFor="f_name"
//               className="block mb-2 font-semibold text-gray-300"
//             >
//               Full Name
//             </label>
//             <input
//               id="f_name"
//               name="f_name"
//               type="text"
//               value={profile.f_name}
//               onChange={handleChange}
//               className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
//               placeholder="Enter your full name"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block mb-2 font-semibold text-gray-300"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={profile.email}
//               onChange={handleChange}
//               className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           {/* Department - Fixed MCA */}
//           <div>
//             <label
//               htmlFor="department"
//               className="block mb-2 font-semibold text-gray-300"
//             >
//               Department
//             </label>
//             <input
//               id="department"
//               name="department"
//               type="text"
//               value="MCA"
//               readOnly
//               disabled
//               className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-gray-400 cursor-not-allowed"
//             />
//           </div>

//           {/* Year of Study Dropdown */}
//           <div>
//             <label
//               htmlFor="yearOfStudy"
//               className="block mb-2 font-semibold text-gray-300"
//             >
//               Year of Study
//             </label>
//             <select
//               id="yearOfStudy"
//               name="yearOfStudy"
//               value={profile.yearOfStudy}
//               onChange={handleChange}
//               className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
//             >
//               <option value="1">1st Year</option>
//               <option value="2">2nd Year</option>
//             </select>
//           </div>

//           {/* Semester Dropdown */}
//           <div>
//             <label
//               htmlFor="semester"
//               className="block mb-2 font-semibold text-gray-300"
//             >
//               Semester
//             </label>
//             <select
//               id="semester"
//               name="semester"
//               value={profile.semester}
//               onChange={handleChange}
//               className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
//             >
//               <option value="1">Semester 1</option>
//               <option value="2">Semester 2</option>
//               <option value="3">Semester 3</option>
//               <option value="4">Semester 4</option>
//             </select>
//           </div>

//           {/* Phone */}
//           <div>
//             <label
//               htmlFor="phone"
//               className="block mb-2 font-semibold text-gray-300"
//             >
//               Phone Number
//             </label>
//             <input
//               id="phone"
//               name="phone"
//               type="tel"
//               value={profile.phone}
//               onChange={handleChange}
//               className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
//               placeholder="Enter your phone number"
//             />
//           </div>

//           {/* Photo Upload */}
//           <div>
//             <label
//               htmlFor="photo"
//               className="block mb-2 font-semibold text-gray-300"
//             >
//               Upload Scan Photo
//             </label>
//             <input
//               id="photo"
//               name="photo"
//               type="file"
//               accept="image/*"
//               onChange={handlePhotoChange}
//               className="text-gray-100"
//             />
//             {/* Preview */}
//             {profile.photoPreviewUrl && (
//               <img
//                 src={profile.photoPreviewUrl}
//                 alt="Profile Preview"
//                 className="mt-4 max-w-xs rounded-md shadow-lg"
//               />
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-700 py-3 rounded-md font-semibold hover:from-purple-700 hover:to-blue-600 transition duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {loading ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default DashboardProfile;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DashboardStudentAdd = () => {
  const [profile, setProfile] = useState({
    f_name: "",
    email: "",
    department: "MCA", // fixed MCA
    yearOfStudy: "1",
    semester: "1",
    phone: "",
    division: "",
    photo: null, // File object for photo upload
    photoPreviewUrl: "", // preview URL for uploaded/captured photo
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        setProfile((prev) => ({
          ...prev,
          f_name: data.f_name || "",
          email: data.email || "",
          department: "MCA", // fixed to MCA
          yearOfStudy: data.yearOfStudy || "1",
          semester: data.semester || "1",
          phone: data.phone || "",
          photoPreviewUrl: data.photoUrl || "", // API photo URL
        }));
      } catch (err) {
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        photo: file,
        photoPreviewUrl: URL.createObjectURL(file),
      }));
    }
  };

  // Start camera
  const startCamera = async () => {
    setIsCameraOn(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      alert("Could not access camera");
      setIsCameraOn(false);
    }
  };

  // Capture photo from camera
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      const file = new File([blob], "captured_photo.png", {
        type: "image/png",
      });
      setProfile((prev) => ({
        ...prev,
        photo: file,
        photoPreviewUrl: URL.createObjectURL(file),
      }));
    });
    stopCamera();
  };

  // Stop camera stream
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.f_name || !profile.email) {
      toast.error("Full Name and Email are required.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Use FormData for file upload
      const formData = new FormData();
      formData.append("f_name", profile.f_name);
      formData.append("email", profile.email);
      formData.append("department", "MCA"); // fixed MCA
      formData.append("yearOfStudy", profile.yearOfStudy);
      formData.append("semester", profile.semester);
      formData.append("phone", profile.phone);
      if (profile.photo) {
        formData.append("photo", profile.photo);
      }

      await axios.put("http://localhost:4000/api/profile/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">
        Student Information
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="f_name"
              className="block mb-2 font-semibold text-gray-300"
            >
              Full Name
            </label>
            <input
              id="f_name"
              name="f_name"
              type="text"
              value={profile.f_name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Department - Fixed MCA */}
          <div>
            <label
              htmlFor="department"
              className="block mb-2 font-semibold text-gray-300"
            >
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              value="MCA"
              readOnly
              disabled
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Year of Study Dropdown */}
          <div>
            <label
              htmlFor="yearOfStudy"
              className="block mb-2 font-semibold text-gray-300"
            >
              Year of Study
            </label>
            <select
              id="yearOfStudy"
              name="yearOfStudy"
              value={profile.yearOfStudy}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            >
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
            </select>
          </div>

          {/* Semester Dropdown */}
          <div>
            <label
              htmlFor="semester"
              className="block mb-2 font-semibold text-gray-300"
            >
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              value={profile.semester}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="division"
              className="block mb-2 font-semibold text-gray-300"
            >
              Division
            </label>
            <select
              id="division"
              name="division"
              value={profile.division}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            >
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 font-semibold text-gray-300"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={profile.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label
              htmlFor="photo"
              className="block mb-2 font-semibold text-gray-300"
            >
              Upload Scan Photo
            </label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="text-gray-100"
            />
            {profile.photoPreviewUrl && (
              <img
                src={profile.photoPreviewUrl}
                alt="Profile Preview"
                className="mt-4 max-w-xs rounded-md shadow-lg"
              />
            )}
          </div>

          {/* Camera Capture */}
          <div className="mt-6">
            {!isCameraOn ? (
              <button
                type="button"
                onClick={startCamera}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Scan Face via Camera
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <video
                  ref={videoRef}
                  className="rounded-md shadow-lg"
                  autoPlay
                  muted
                />
                <div className="mt-2 space-x-4">
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Capture
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 py-3 rounded-md font-semibold hover:from-purple-700 hover:to-blue-600 transition duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default DashboardStudentAdd;
