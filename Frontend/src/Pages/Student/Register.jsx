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
  });

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL =
        "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
      console.log("Face-api models loaded from CDN");
    };

    loadModels();

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Camera error:", err));
  }, []);

  const captureImage = async () => {
    if (!modelsLoaded) {
      alert("Models not loaded yet, please wait...");
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 320, 240);

    // Detect faces on the canvas image
    const detections = await faceapi.detectAllFaces(
      canvas,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (detections.length === 0) {
      alert("❌ No face detected! Please try again.");
      return;
    }

    const imgData = canvas.toDataURL("image/png");
    setCapturedImages((prev) => [...prev, imgData]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (capturedImages.length === 0) {
      alert("Please capture at least one image");
      return;
    }

    try {
      await axios.post("http://localhost:7070/api/register", {
        ...formData,
        faceDescriptor: [], // add real descriptor if you want
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
      });
      setCapturedImages([]);
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ Error registering student");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="stdName"
          placeholder="Name"
          value={formData.stdName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="rollNo"
          placeholder="Roll No"
          value={formData.rollNo}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="Class"
          placeholder="Class"
          value={formData.Class}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="div"
          placeholder="Division"
          value={formData.div}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <br />
        <video ref={videoRef} autoPlay width="320" height="240" />
        <br />
        <button type="button" onClick={captureImage}>
          📸 Capture Image
        </button>
        <br />
        {capturedImages.map((img, idx) => (
          <img key={idx} src={img} alt={`capture-${idx}`} width="100" />
        ))}
        <canvas
          ref={canvasRef}
          width="320"
          height="240"
          style={{ display: "none" }}
        />
        <br />
        <button type="submit">📝 Register Student</button>
      </form>
    </div>
  );
}
