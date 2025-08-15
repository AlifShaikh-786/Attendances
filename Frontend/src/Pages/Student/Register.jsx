// import React, { useRef, useState, useEffect } from "react";
// import axios from "axios";

// export default function StudentRegistration() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [capturedImages, setCapturedImages] = useState([]); // multiple captures
//   const [formData, setFormData] = useState({
//     stdName: "",
//     rollNo: "",
//     class: "",
//     semester: "",
//     div: "",
//     email: "",
//     contact: "",
//   });

//   // Start camera
//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//       })
//       .catch((err) => console.error("Camera error:", err));
//   }, []);

//   // Capture image from video and add to images array
//   const captureImage = () => {
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, 320, 240);
//     const imgData = canvasRef.current.toDataURL("image/png");
//     setCapturedImages((prev) => [...prev, imgData]);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submit form with multiple images
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (capturedImages.length === 0) {
//       alert("Please capture at least one image");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:7070/api/register", {
//         ...formData,
//         faceDescriptor: [], // add real data if you have
//         image: capturedImages,
//       });
//       alert("✅ Student registered successfully!");
//       setFormData({
//         stdName: "",
//         rollNo: "",
//         class: "",
//         semester: "",
//         div: "",
//         email: "",
//         contact: "",
//       });
//       setCapturedImages([]);
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert("❌ Error registering student");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h2>Student Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="stdName"
//           placeholder="Name"
//           value={formData.stdName}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           name="rollNo"
//           placeholder="Roll No"
//           value={formData.rollNo}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           name="class"
//           placeholder="Class"
//           value={formData.class}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           name="semester"
//           placeholder="Semester"
//           value={formData.semester}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           name="div"
//           placeholder="Division"
//           value={formData.div}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           name="contact"
//           placeholder="Contact"
//           value={formData.contact}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <video ref={videoRef} autoPlay width="320" height="240" />
//         <br />
//         <button type="button" onClick={captureImage}>
//           📸 Capture Image
//         </button>
//         <br />
//         {capturedImages.map((img, idx) => (
//           <img key={idx} src={img} alt={`capture-${idx}`} width="100" />
//         ))}
//         <canvas
//           ref={canvasRef}
//           width="320"
//           height="240"
//           style={{ display: "none" }}
//         />
//         <br />
//         <button type="submit">📝 Register Student</button>
//       </form>
//     </div>
//   );
// }

// import React, { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import * as faceapi from "@vladmandic/face-api";

// export default function StudentRegistration() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [capturedImages, setCapturedImages] = useState([]);
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [formData, setFormData] = useState({
//     stdName: "",
//     rollNo: "",
//     Class: "",
//     semester: "",
//     div: "",
//     email: "",
//     contact: "",
//     faceDescriptor: [],
//   });

//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL =
//         "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
//       await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//       setModelsLoaded(true);
//       console.log("✅ Face-api models loaded from CDN");
//     };

//     loadModels();

//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       })
//       .catch((err) => console.error("Camera error:", err));
//   }, []);

//   const captureImage = async () => {
//     if (!modelsLoaded) {
//       alert("Models not loaded yet, please wait...");
//       return;
//     }

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, 320, 240);

//     const detection = await faceapi
//       .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     if (!detection) {
//       alert("❌ No face detected! Please try again.");
//       return;
//     }

//     const imgData = canvas.toDataURL("image/png");

//     setCapturedImages((prev) => [...prev, imgData]);
//     setFormData((prev) => ({
//       ...prev,
//       faceDescriptor: Array.from(detection.descriptor),
//     }));

//     console.log("✅ Face descriptor captured:", detection.descriptor);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (capturedImages.length === 0) {
//       alert("Please capture at least one image");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:7070/api/register", {
//         ...formData,
//         image: capturedImages,
//       });
//       alert("✅ Student registered successfully!");
//       setFormData({
//         stdName: "",
//         rollNo: "",
//         Class: "",
//         semester: "",
//         div: "",
//         email: "",
//         contact: "",
//         faceDescriptor: [],
//       });
//       setCapturedImages([]);
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert("❌ Error registering student");
//     }
//   };

//   return (
//     <div className=" items-center gap-3 group">
//       <div className="flex gap-3">
//         <img
//           src="/Assets/DYPIMED-Logo.png"
//           alt="DYPIMED Logo"
//           className="w-20 h-20 animate-bounce transition-transform duration-300 group-hover:scale-110"
//           loading="lazy"
//           draggable={false}
//         />
//         <h3
//           className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600
//                      font-extrabold text-2xl md:text-3xl select-none
//                      drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
//         >
//           DYPIMED
//         </h3>
//       </div>

//       <div className="min-h-screen flex items-center justify-center p-6 sm:p-12 ">
//         <div
//           className="w-full max-w-3xl bg-slate-300 rounded-3xl shadow-2xl p-8 sm:p-12
//                   border border-slate-400 flex flex-col items-center
//                   hover:shadow-indigo-500/50 transition-shadow duration-300"
//         >
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-900 mb-10 tracking-wide drop-shadow-md">
//             Student Registration
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-8 w-full">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
//               {[
//                 { name: "stdName", label: "Full Name" },
//                 { name: "rollNo", label: "Roll Number" },
//                 { name: "Class", label: "Class" },
//                 { name: "semester", label: "Semester" },
//                 { name: "div", label: "Division" },
//                 { name: "email", label: "Email", type: "email" },
//                 { name: "contact", label: "Contact Number" },
//                 { name: "password", label: "Password", type: "password" },
//               ].map(({ name, label, type }) => (
//                 <div key={name} className="flex flex-col">
//                   <label
//                     htmlFor={name}
//                     className="mb-1 font-semibold text-gray-700 flex items-center gap-1"
//                   >
//                     {label} <span className="text-red-600">*</span>
//                   </label>
//                   <input
//                     id={name}
//                     name={name}
//                     type={type || "text"}
//                     placeholder={`Enter ${label.toLowerCase()}`}
//                     value={formData[name]}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-5 py-3 border border-slate-300 rounded-2xl
//                        text-gray-900 placeholder-slate-500
//                        focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400
//                        transition duration-300 shadow-sm hover:shadow-md text-lg"
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-col items-center space-y-6 sm:space-y-8 mt-6">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 className="rounded-3xl border-4 border-indigo-600 shadow-lg
//                      w-full max-w-[320px] h-auto"
//               />

//               <button
//                 type="button"
//                 onClick={captureImage}
//                 className="w-full max-w-xs py-3 bg-indigo-700 hover:bg-indigo-900
//                      text-white font-bold rounded-full shadow-lg
//                      transition duration-300 transform hover:scale-105"
//               >
//                 📸 Capture Image
//               </button>

//               <div className="flex flex-wrap justify-center gap-4 mt-4">
//                 {capturedImages.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={`capture-${idx}`}
//                     className="w-20 h-20 rounded-2xl border-2 border-indigo-400 shadow-md"
//                   />
//                 ))}
//               </div>

//               <canvas
//                 ref={canvasRef}
//                 width="320"
//                 height="240"
//                 style={{ display: "none" }}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-4 bg-indigo-700 hover:bg-indigo-900
//                    text-white font-extrabold rounded-3xl shadow-xl
//                    transition duration-300 transform hover:scale-105 mt-10"
//             >
//               📝 Register Student
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import * as faceapi from "@vladmandic/face-api";

export default function StudentRegistration() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [capturedImages, setCapturedImages] = useState([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    stdName: "",
    rollNo: "",
    Class: "",
    semester: "",
    div: "",
    email: "",
    contact: "",
    password: "",
    faceDescriptor: [],
  });

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL =
        "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
      console.log("✅ Face-api models loaded from CDN");
    };

    loadModels();

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Camera error:", err));
  }, []);

  const captureImage = async () => {
    if (!modelsLoaded) {
      alert("Models not loaded yet, please wait...");
      return;
    }

    const canvas = canvasRef.current;
    // add willReadFrequently to address the warning & improve perf
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(videoRef.current, 0, 0, 320, 240);

    const detection = await faceapi
      .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      alert("❌ No face detected! Please try again.");
      return;
    }

    const imgData = canvas.toDataURL("image/png");

    setCapturedImages((prev) => [...prev, imgData]);
    setFormData((prev) => ({
      ...prev,
      faceDescriptor: Array.from(detection.descriptor),
    }));

    console.log("✅ Face descriptor captured:", detection.descriptor);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Optional: prevent submit if browser reports invalid fields
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Let the browser show built-in messages first
    const formEl = e.currentTarget;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    if (capturedImages.length === 0) {
      alert("Please capture at least one image");
      return;
    }

    try {
      // NOTE: If your backend expects multipart/form-data, switch to FormData.
      await axios.post("http://localhost:7070/api/register", {
        ...formData,
        image: capturedImages,
      });
      alert("✅ Student registered successfully!");
      setFormData({
        stdName: "",
        rollNo: "",
        Class: "",
        semester: "",
        div: "",
        email: "",
        contact: "",
        password: "",
        faceDescriptor: [],
      });
      setCapturedImages([]);
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ Error registering student");
    }
  };

  return (
    <div className="items-center gap-3 group">
      <div className="flex gap-3 justify-center mt-6">
        <img
          src="/Assets/DYPIMED-Logo.png"
          alt="DYPIMED Logo"
          className="w-20 h-20 animate-bounce transition-transform duration-300 group-hover:scale-110"
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
      </div>

      <div className="min-h-screen flex items-center justify-center p-6 sm:p-12">
        <div
          className="w-full max-w-3xl bg-slate-300 rounded-3xl shadow-2xl p-8 sm:p-12
                  border border-slate-400 flex flex-col items-center
                  hover:shadow-indigo-500/50 transition-shadow duration-300"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-900 mb-10 tracking-wide drop-shadow-md">
            Student Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 w-full" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="stdName"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.stdName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 shadow-sm hover:shadow-md text-lg"
                />
              </div>

              {/* Roll Number: exactly 5 Numbers */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">
                  Roll Number <span className="text-red-600">*</span>
                </label>
                <input
                  name="rollNo"
                  type="text"
                  placeholder="Exactly 5 digits (e.g., 12345)"
                  value={formData.rollNo}
                  onChange={handleChange}
                  required
                  pattern="^[0-9]{5}$"
                  title="Roll number must be exactly 5 digits (0–9)."
                  maxLength={5}
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 shadow-sm hover:shadow-md text-lg"
                />
              </div>

              {/* Class Dropdown */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">
                  Class <span className="text-red-600">*</span>
                </label>
                <select
                  name="Class"
                  value={formData.Class}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 shadow-sm hover:shadow-md text-lg"
                >
                  <option value="">Select Class</option>
                  <option value="MCA-I">MCA-I</option>
                  <option value="MCA-II">MCA-II</option>
                </select>
              </div>

              {/* Semester Dropdown */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">
                  Semester <span className="text-red-600">*</span>
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 shadow-sm hover:shadow-md text-lg"
                >
                  <option value="">Select Semester</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
              </div>

              {/* Division Dropdown */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">
                  Division <span className="text-red-600">*</span>
                </label>
                <select
                  name="div"
                  value={formData.div}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 shadow-sm hover:shadow-md text-lg"
                >
                  <option value="">Select Division</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                </select>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  // Simple robust pattern to catch obvious mistakes
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                  title="Enter a valid email like name@example.com"
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 shadow-sm hover:shadow-md text-lg"
                />
              </div>

              {/* Contact (Phone): exactly 10 digits */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">
                  Contact Number <span className="text-red-600">*</span>
                </label>
                <input
                  name="contact"
                  type="text"
                  inputMode="numeric"
                  placeholder="10-digit phone number"
                  value={formData.contact}
                  onChange={(e) => {
                    // keep only digits
                    e.target.value = e.target.value.replace(/\D/g, "");
                    handleChange(e);
                  }}
                  required
                  pattern="^\d{10}$"
                  title="Phone number must be exactly 10 digits."
                  maxLength={10}
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 shadow-sm hover:shadow-md text-lg"
                />
              </div>

              {/* Password: min 8 characters */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  title="Password must be at least 8 characters long."
                  className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 shadow-sm hover:shadow-md text-lg"
                />
              </div>
            </div>

            {/* Camera Section */}
            <div className="flex flex-col items-center space-y-6 sm:space-y-8 mt-6">
              <video
                ref={videoRef}
                autoPlay
                className="rounded-3xl border-4 border-indigo-600 shadow-lg
                     w-full max-w-[320px] h-auto"
              />

              <button
                type="button"
                onClick={captureImage}
                className="w-full max-w-xs py-3 bg-indigo-700 hover:bg-indigo-900
                     text-white font-bold rounded-full shadow-lg
                     transition duration-300 transform hover:scale-105"
              >
                📸 Capture Image
              </button>

              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {capturedImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`capture-${idx}`}
                    className="w-20 h-20 rounded-2xl border-2 border-indigo-400 shadow-md"
                  />
                ))}
              </div>

              <canvas
                ref={canvasRef}
                width="320"
                height="240"
                style={{ display: "none" }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-indigo-700 hover:bg-indigo-900
                   text-white font-extrabold rounded-3xl shadow-xl
                   transition duration-300 transform hover:scale-105 mt-10"
            >
              📝 Register Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
