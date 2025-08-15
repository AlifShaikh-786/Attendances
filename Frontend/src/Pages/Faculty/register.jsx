import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import * as faceapi from "@vladmandic/face-api";

export default function FacultyRegistration() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [capturedImages, setCapturedImages] = useState([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    facultyName: "",
    facultyId: "",
    email: "",
    password: "",
    department: "",
    contact: "",
    subject: [],
    image: [],
  });
  const [subjectInput, setSubjectInput] = useState("");

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
    }));

    console.log("✅ Face descriptor captured:", detection.descriptor);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubject = () => {
    if (
      subjectInput.trim() &&
      !formData.subject.includes(subjectInput.trim())
    ) {
      setFormData({
        ...formData,
        subject: [...formData.subject, subjectInput.trim()],
      });
      setSubjectInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (capturedImages.length === 0) {
      alert("Please capture at least one image");
      return;
    }

    try {
      await axios.post("http://localhost:7070/api/faculty/register", formData);
      alert("✅ Faculty registered successfully!");
      setFormData({
        facultyName: "",
        facultyId: "",
        email: "",
        password: "",
        department: "",
        contact: "",
        subject: [],
        image: [],
      });
      setCapturedImages([]);
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ Error registering faculty");
    }
  };

  return (
    <div className="items-center gap-3 group">
      {/* Header with Logo */}
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

      {/* Form Card */}
      <div className="min-h-screen flex items-center justify-center p-6 sm:p-12">
        <div
          className="w-full max-w-3xl bg-slate-300 rounded-3xl shadow-2xl p-8 sm:p-12
                  border border-slate-400 flex flex-col items-center
                  hover:shadow-indigo-500/50 transition-shadow duration-300"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-900 mb-10 tracking-wide drop-shadow-md">
            Faculty Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 w-full" noValidate>
            {/* Faculty Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
              <input
                name="facultyName"
                type="text"
                placeholder="Full Name"
                value={formData.facultyName}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 
                           placeholder-slate-500 focus:outline-none focus:ring-4 
                           focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 
                           shadow-sm hover:shadow-md text-lg"
              />
              <input
                name="facultyId"
                type="text"
                placeholder="Faculty ID"
                value={formData.facultyId}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 
                           placeholder-slate-500 focus:outline-none focus:ring-4 
                           focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 
                           shadow-sm hover:shadow-md text-lg"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 
                           placeholder-slate-500 focus:outline-none focus:ring-4 
                           focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 
                           shadow-sm hover:shadow-md text-lg"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 
                           placeholder-slate-500 focus:outline-none focus:ring-4 
                           focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 
                           shadow-sm hover:shadow-md text-lg"
              />
              <input
                name="department"
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 
                           placeholder-slate-500 focus:outline-none focus:ring-4 
                           focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 
                           shadow-sm hover:shadow-md text-lg"
              />
              <input
                name="contact"
                type="text"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  handleChange(e);
                }}
                required
                pattern="^\d{10}$"
                maxLength={10}
                className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 
                           placeholder-slate-500 focus:outline-none focus:ring-4 
                           focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 
                           shadow-sm hover:shadow-md text-lg"
              />
            </div>

            {/* Subject Input */}
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Add Subject"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                className="w-full px-5 py-3 border border-slate-300 rounded-2xl text-gray-900 
                           placeholder-slate-500 focus:outline-none focus:ring-4 
                           focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 
                           shadow-sm hover:shadow-md text-lg"
              />
              <button
                type="button"
                onClick={handleAddSubject}
                className="px-6 py-3 bg-indigo-700 hover:bg-indigo-900 text-white font-bold 
                           rounded-full shadow-lg transition duration-300 transform hover:scale-105"
              >
                ➕ Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.subject.map((subj, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-200 rounded-full text-indigo-900 font-semibold"
                >
                  {subj}
                </span>
              ))}
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
              📝 Register Faculty
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
