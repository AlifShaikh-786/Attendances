// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EditProfile = () => {
//   const [formData, setFormData] = useState({
//     rollNo_id: "",
//     fName: "",
//     mName: "",
//     lName: "",
//     batch: "",
//     Class: "",
//     semester: "",
//     div: "",
//     email: "",
//     contact: "",
//   });

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("studentInfo"));
//       if (storedUser) {
//         setFormData(storedUser);
//         console.log("Loaded user from localStorage:", storedUser);
//       } else {
//         setMessage("User data not found in localStorage.");
//       }
//     } catch (error) {
//       console.error("Error loading user data:", error);
//       setMessage("Failed to load user data.");
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.rollNo_id) {
//       setMessage("❌ User ID is missing. Cannot update profile.");
//       return;
//     }

//     try {
//       console.log("Sending PUT request with data:", formData);
//       const response = await axios.put(
//         `http://localhost:7070/api/EditUserProfiles/${formData.rollNo_id}`,
//         formData
//       );

//       console.log("API Response:", response.data);
//       setMessage("✅ Profile updated successfully!");

//       // Update localStorage correctly
//       localStorage.setItem("studentInfo", JSON.stringify(response.data.user));
//     } catch (error) {
//       console.error("Error updating profile:", error.response || error);
//       setMessage(
//         error.response?.data?.message || "❌ Failed to update profile."
//       );
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       <h2>Edit Profile</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <InputField
//           label="Roll No:"
//           name="rollNo_id"
//           value={formData.rollNo_id}
//           readOnly
//         />
//         <InputField
//           label="Batch:"
//           name="batch"
//           value={formData.batch}
//           readOnly
//         />

//         {/* Editable Fields */}
//         {[
//           "Class",
//           "semester",
//           "div",
//           "fName",
//           "mName",
//           "lName",
//           "email",
//           "contact",
//         ].map((field) => (
//           <InputField
//             key={field}
//             label={field}
//             name={field}
//             value={formData[field] || ""}
//             onChange={handleChange}
//             type={field === "email" ? "email" : "text"}
//           />
//         ))}

//         <button type="submit" style={buttonStyle}>
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// // Reusable input field
// const InputField = ({
//   label,
//   name,
//   value,
//   onChange,
//   readOnly = false,
//   type = "text",
// }) => (
//   <div style={fieldStyle}>
//     <label>{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       readOnly={readOnly}
//       style={inputStyle}
//     />
//   </div>
// );

// // Styles
// const containerStyle = {
//   maxWidth: "500px",
//   margin: "20px auto",
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
// };
// const fieldStyle = { marginBottom: "10px" };
// const inputStyle = {
//   width: "100%",
//   padding: "8px",
//   borderRadius: "4px",
//   border: "1px solid #ccc",
// };
// const buttonStyle = {
//   padding: "10px",
//   background: "#4CAF50",
//   color: "#fff",
//   border: "none",
//   borderRadius: "4px",
// };

// export default EditProfile;

// =====================================================================================================================================

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import * as faceapi from "@vladmandic/face-api";

// const EditProfile = () => {
//   const [formData, setFormData] = useState({
//     rollNo_id: "",
//     fName: "",
//     mName: "",
//     lName: "",
//     batch: "",
//     Class: "",
//     semester: "",
//     div: "",
//     email: "",
//     contact: "",
//     faceDescriptor: [],
//     image: [],
//   });

//   const [message, setMessage] = useState("");
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [modelsLoaded, setModelsLoaded] = useState(false);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Load models and start camera
//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL =
//         "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
//       await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//       setModelsLoaded(true);
//       console.log("✅ Face-api models loaded");
//     };

//     loadModels();

//     // Start camera
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       })
//       .catch((err) => console.error("Camera error:", err));

//     // Load user from localStorage
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("studentInfo"));
//       if (storedUser) {
//         setFormData(storedUser);
//         console.log("Loaded user from localStorage:", storedUser);
//       } else {
//         setMessage("User data not found in localStorage.");
//       }
//     } catch (error) {
//       console.error("Error loading user data:", error);
//       setMessage("Failed to load user data.");
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Capture Image and Face Descriptor
//   const captureImage = async () => {
//     if (!modelsLoaded) {
//       alert("Models not loaded yet, please wait...");
//       return;
//     }

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d", { willReadFrequently: true });
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
//       image: [...prev.image, imgData],
//       faceDescriptor: prev.faceDescriptor.length
//         ? prev.faceDescriptor.map(
//             (val, i) => (val + detection.descriptor[i]) / 2
//           )
//         : Array.from(detection.descriptor),
//     }));

//     console.log("✅ Face descriptor captured:", detection.descriptor);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.rollNo_id) {
//       setMessage("❌ User ID is missing. Cannot update profile.");
//       return;
//     }

//     try {
//       console.log("Sending PUT request with data:", formData);
//       const response = await axios.put(
//         `http://localhost:7070/api/EditUserProfiles/${formData.rollNo_id}`,
//         formData
//       );

//       setCapturedImages([]);
//       console.log("API Response:", response.data);
//       setMessage("✅ Profile updated successfully!");

//       // Update localStorage
//       localStorage.setItem("studentInfo", JSON.stringify(response.data.user));
//     } catch (error) {
//       console.error("Error updating profile:", error.response || error);
//       setMessage(
//         error.response?.data?.message || "❌ Failed to update profile."
//       );
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       <h2>Edit Profile</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <InputField
//           label="Roll No:"
//           name="rollNo_id"
//           value={formData.rollNo_id}
//           readOnly
//         />
//         <InputField
//           label="Batch:"
//           name="batch"
//           value={formData.batch}
//           readOnly
//         />

//         {/* Editable Fields */}
//         {[
//           "Class",
//           "semester",
//           "div",
//           "fName",
//           "mName",
//           "lName",
//           "email",
//           "contact",
//         ].map((field) => (
//           <InputField
//             key={field}
//             label={field}
//             name={field}
//             value={formData[field] || ""}
//             onChange={handleChange}
//             type={field === "email" ? "email" : "text"}
//           />
//         ))}

//         {/* Camera Section */}
//         <div style={{ textAlign: "center", marginTop: "15px" }}>
//           <video
//             ref={videoRef}
//             width="320"
//             height="240"
//             autoPlay
//             muted
//             style={{ borderRadius: "8px" }}
//           />
//           <br />
//           <button type="button" style={buttonStyle} onClick={captureImage}>
//             Capture Image
//           </button>
//           <div className="flex flex-wrap justify-center gap-4 mt-4">
//             {capturedImages.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`capture-${idx}`}
//                 className="w-20 h-20 rounded-2xl border-2 border-indigo-400 shadow-md"
//               />
//             ))}
//           </div>
//           <canvas
//             ref={canvasRef}
//             width="320"
//             height="240"
//             style={{ display: "none" }}
//           />
//         </div>

//         <button type="submit" style={{ ...buttonStyle, marginTop: "15px" }}>
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// // Reusable input field
// const InputField = ({
//   label,
//   name,
//   value,
//   onChange,
//   readOnly = false,
//   type = "text",
// }) => (
//   <div style={fieldStyle}>
//     <label>{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       readOnly={readOnly}
//       style={inputStyle}
//     />
//   </div>
// );

// // Styles
// const containerStyle = {
//   maxWidth: "500px",
//   margin: "20px auto",
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
// };
// const fieldStyle = { marginBottom: "10px" };
// const inputStyle = {
//   width: "100%",
//   padding: "8px",
//   borderRadius: "4px",
//   border: "1px solid #ccc",
// };
// const buttonStyle = {
//   padding: "10px",
//   background: "#4CAF50",
//   color: "#fff",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// export default EditProfile;

// ====================================================================================================================================

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as faceapi from "@vladmandic/face-api";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    rollNo_id: "",
    fName: "",
    mName: "",
    lName: "",
    batch: "",
    Class: "",
    semester: "",
    div: "",
    email: "",
    contact: "",
    faceDescriptor: [],
    image: [],
  });

  const [message, setMessage] = useState("");
  const [capturedImages, setCapturedImages] = useState([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load models and start camera
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL =
        "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
      console.log("✅ Face-api models loaded");
    };

    loadModels();

    // Start camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Camera error:", err));

    // Load user from localStorage
    try {
      const storedUser = JSON.parse(localStorage.getItem("studentInfo"));
      if (storedUser) {
        setFormData(storedUser);
        console.log("Loaded user from localStorage:", storedUser);
      } else {
        setMessage("User data not found in localStorage.");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      alert("Failed to load user data.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Start Camera
  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  // Capture Image and Face Descriptor
  const captureImage = async () => {
    if (!modelsLoaded) {
      alert("Models not loaded yet, please wait...");
      return;
    }

    const canvas = canvasRef.current;
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
      image: [...prev.image, imgData],
      faceDescriptor: prev.faceDescriptor.length
        ? prev.faceDescriptor.map(
            (val, i) => (val + detection.descriptor[i]) / 2
          )
        : Array.from(detection.descriptor),
    }));

    console.log("✅ Face descriptor captured:", detection.descriptor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.rollNo_id) {
      alert("❌ User ID is missing. Cannot update profile.");
      return;
    }

    try {
      console.log("Sending PUT request with data:", formData);
      const response = await axios.put(
        `http://localhost:7070/api/EditUserProfiles/${formData.rollNo_id}`,
        formData
      );

      setCapturedImages([]);
      console.log("API Response:", response.data);
      alert("✅ Profile updated successfully!");

      // Update localStorage
      localStorage.setItem("studentInfo", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Error updating profile:", error.response || error);
      alert(error.response?.data?.message || "❌ Failed to update profile.");
    }
  };
  //  "Class",
  //           "semester",
  //           "div",
  //           "fName",
  //           "mName",
  //           "lName",
  //           "email",
  //           "contact",
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      {message && (
        <p className="text-center text-green-600 font-semibold mb-4">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Roll No */}
        <div>
          <label className="block text-gray-700 font-medium">Roll No:</label>
          <input
            type="text"
            name="rollNo_id"
            value={formData.rollNo_id}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
          />
        </div>

        {/* Batch */}
        <div>
          <label className="block text-gray-700 font-medium">Batch:</label>
          <input
            type="text"
            name="batch"
            value={formData.batch}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
          />
        </div>

        {/* Class Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium">Class:</label>
          <select
            name="Class"
            value={formData.Class}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Class</option>
            <option value="MCA-I">MCA-I</option>
            <option value="MCA-II">MCA-II</option>
          </select>
        </div>

        {/* Semester */}

        <div>
          <label className="block text-gray-700 font-medium">Semester:</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Semester</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
        </div>

        {/* Division */}

        <div>
          <label className="block text-gray-700 font-medium">Division:</label>
          <select
            name="div"
            value={formData.div}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Division</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>

        {/* First Name */}
        <div>
          <label className="block text-gray-700 font-medium">First Name:</label>
          <input
            type="text"
            name="fName"
            value={formData.fName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Middle Name */}
        <div>
          <label className="block text-gray-700 font-medium">
            Middle Name:
          </label>
          <input
            type="text"
            name="mName"
            value={formData.mName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700 font-medium">Last Name:</label>
          <input
            type="text"
            name="lName"
            value={formData.lName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-gray-700 font-medium">Contact:</label>
          <input
            type="tel"
            name="contact"
            pattern="[0-9]{10}"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Camera Section */}
        <div className="text-center mt-6">
          <video
            ref={videoRef}
            width="320"
            height="240"
            autoPlay
            muted
            className="rounded-lg border-2 border-gray-300 shadow-md"
          />
          <br />
          <div className="flex justify-center gap-3 mt-3">
            {/* Start Camera Button */}
            {/* <button
              type="button"
              onClick={startCamera}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Start Camera
            </button>

            {/* Stop Camera Button */}
            {/* <button
              type="button"
              onClick={stopCamera}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Stop Camera
            </button> */}{" "}
            {/* */}
            {/* Capture Image Button */}
            {/* <button
              type="button"
              onClick={captureImage}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Capture Image
            </button> */}
          </div>
          <button
            type="button"
            onClick={captureImage}
            className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Capture Image
          </button>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {capturedImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`capture-${idx}`}
                className="w-20 h-20 rounded-xl border-2 border-indigo-400 shadow-md"
              />
            ))}
          </div>

          <canvas ref={canvasRef} width="320" height="240" className="hidden" />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
