import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "@vladmandic/face-api";

const StdAttendance = () => {
  const [formdata, setFormData] = useState({
    Class: "",
    semester: "",
    div: "",
    batch: "",
    Subject: "",
    Time: "",
    date: "",
    facultyId_id: "",
    department: "",
  });

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [useIPCam, setUseIPCam] = useState(false);
  const [ipCamUrl, setIpCamUrl] = useState("http://192.168.43.1:8080/video");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models/";

  // ----------------- Load face-api models -----------------
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        console.log("✅ Face-api models loaded");
      } catch (err) {
        console.error("Error loading models:", err);
      }
    };
    loadModels();
  }, []);

  // ----------------- Load studentInfo from localStorage -----------------
  useEffect(() => {
    const studentInfo = JSON.parse(localStorage.getItem("studentInfo") || "{}");
    if (studentInfo) {
      setFormData((prev) => ({
        ...prev,
        department: studentInfo.department || "",
        facultyId_id: studentInfo.facultyId_id || "",
      }));
    }
  }, []);

  // ----------------- Handle form changes -----------------
  const handleChange = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value });

  const isValidTime = (time) => {
    if (!time) return false;
    const [hours, minutes] = time.split(":").map(Number);
    const input = new Date();
    input.setHours(hours, minutes, 0);
    const start = new Date();
    start.setHours(9, 30, 0);
    const end = new Date();
    end.setHours(17, 0, 0);
    return input >= start && input <= end;
  };

  // ----------------- Start PC Webcam -----------------
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Webcam error:", err));
  };

  // ----------------- Start IP Camera -----------------
  const startIPCam = () => {
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = ipCamUrl;
      videoRef.current.play();
    }
  };

  // ----------------- Switch cameras -----------------
  useEffect(() => {
    if (!students.length) return;
    useIPCam ? startIPCam() : startVideo();
  }, [useIPCam, ipCamUrl, students]);

  // ----------------- Load students -----------------
  const StdDetailSubmit = async (e) => {
    e.preventDefault();
    if (!isValidTime(formdata.Time)) {
      alert("❌ Time must be between 9:30 AM and 5:00 PM");
      return;
    }
    if (!formdata.Class || !formdata.semester || !formdata.div) {
      alert("❌ Please select Class, Semester, and Division");
      return;
    }
 

    try {
      let divisions = [];
      if (formdata.div === "AB") {
        divisions = ["A", "B"];
      } else {
        divisions = [formdata.div];
      }
      const res = await fetch("http://localhost:7070/api/StdDisplays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Class: formdata.Class,
          semester: formdata.semester,
          div: formdata.div,
        }),
      });
      const data = await res.json();
      console.log("Students fetched:", data);

      if (res.ok && Array.isArray(data) && data.length > 0) {
        setStudents(data);
        const initialAttendance = {};
        data.forEach((s) => (initialAttendance[s._id] = false));
        setAttendance(initialAttendance);
      } else {
        alert("❌ Student Details Not Found");
        setStudents([]);
        setAttendance({});
      }
    } catch (err) {
      alert("Server Error: " + err.message);
    }
  };

  // ----------------- Create labeled face descriptors -----------------
  const createLabeledDescriptors = () =>
    students.map((s) => {
      const descriptors =
        s.faceDescriptor?.map((d) => new Float32Array(d)) || [];
      return new faceapi.LabeledFaceDescriptors(s._id, descriptors);
    });

  // ----------------- Face recognition -----------------
  useEffect(() => {
    if (!students.length) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const labeledDescriptors = createLabeledDescriptors();
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.4);
    const displaySize = { width: 720, height: 560 };
    faceapi.matchDimensions(canvas, displaySize);

    let intervalId;
    const onPlay = () => {
      intervalId = setInterval(async () => {
        if (video.paused || video.ended) return;

        const detections = await faceapi
          .detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 416,
              scoreThreshold: 0.4,
            })
          )
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        ctx.font = "16px Arial"; // ✅ ensures text is visible
        resizedDetections.forEach((det) => {
          const bestMatch = faceMatcher.findBestMatch(det.descriptor);
          const { x, y } = det.detection.box;

          if (bestMatch.label !== "unknown") {
            setAttendance((prev) => ({ ...prev, [bestMatch.label]: true }));
            const name =
              students.find((s) => s._id === bestMatch.label)?.fName ||
              "Unknown";
            ctx.fillStyle = "rgba(0,255,0,0.6)";
            ctx.fillRect(x, y - 20, ctx.measureText(name).width + 10, 20);
            ctx.fillStyle = "black";
            ctx.fillText(name, x + 5, y - 5);
          } else {
            ctx.fillStyle = "rgba(255,0,0,0.6)";
            ctx.fillRect(
              x,
              y - 20,
              ctx.measureText("Not in list").width + 10,
              20
            );
            ctx.fillStyle = "white";
            ctx.fillText("Not in list", x + 5, y - 5);
          }
        });
      }, 1000);
    };

    video.addEventListener("play", onPlay);
    return () => {
      video.removeEventListener("play", onPlay);
      clearInterval(intervalId);
    };
  }, [students]);

  // ----------------- Submit attendance -----------------
  const handleSubmitAttendance = async () => {
    if (!formdata.Subject || !formdata.Time || !formdata.date) {
      alert("❌ Fill Subject, Time and Date before submitting.");
      return;
    }
    if (!window.confirm("Are you sure you want to save attendance?")) return;

    const attendanceList = students
      .filter(
        (s) =>
          s.fName?.trim() &&
          s.mName?.trim() &&
          s.lName?.trim() &&
          s.rollNo_id?.trim()
      )
      .map((s) => ({
        Class: formdata.Class,
        semester: formdata.semester,
        facultyId_id: formdata.facultyId_id,
        department: formdata.department,
        div: formdata.div,
        batch: formdata.batch,
        fName: s.fName,
        mName: s.mName,
        lName: s.lName,
        rollNo_id: s.rollNo_id,
        image: s.image?.[0] || "",
        date: formdata.date,
        Time: formdata.Time,
        status: attendance[s._id] ? "Present" : "Absent",
        Subject: formdata.Subject,
        reportType: "daily",
      }));

    if (!attendanceList.length) {
      alert("❌ No valid student records to save.");
      return;
    }

    try {
      const res = await fetch("http://localhost:7070/api/AddAttendances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendanceList }),
      });
      if (res.ok) alert("✅ Attendance saved successfully!");
      else alert("❌ Failed to save attendance");
    } catch (err) {
      alert("Error saving attendance: " + err.message);
    }
  };

  const countPresent = Object.values(attendance).filter(Boolean).length;
  const total = students.length;
  const absent = total - countPresent;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Logo */}
      <div className="flex gap-3 justify-center mt-6">
        <img
          src="/Assets/DYPIMED-Logo.png"
          alt="Logo"
          className="w-20 h-20 animate-bounce"
        />
        <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-600">
          DYPIMED
        </h3>
      </div>

      {/* Attendance Form */}
      <form
        onSubmit={StdDetailSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200 mt-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          🎯 Start Attendance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="Class"
            value={formdata.Class}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          >
            <option value="">-- Select Class --</option>
            <option value="MCA-II">MCA-II</option>
            <option value="MCA-I">MCA-I</option>
          </select>
          <select
            name="semester"
            value={formdata.semester}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          >
            <option value="">-- Select Semester --</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
          <select
            name="div"
            value={formdata.div}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          >
            <option value="">-- Select Division --</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">A & B</option>
          </select>
          <input
            type="text"
            name="Subject"
            placeholder="Subject"
            value={formdata.Subject}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
          <input
            type="time"
            name="Time"
            value={formdata.Time}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
          <input
            type="date"
            name="date"
            value={formdata.date}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg mt-4"
        >
          📷 Load Students & Start Camera
        </button>
      </form>

      {/* Camera & Attendance */}
      {students.length > 0 && (
        <div className="mt-6">
          {/* Camera Section */}
          <div className="relative w-[720px] h-[560px] mx-auto border-4 border-gray-300 rounded-lg overflow-hidden">
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setUseIPCam(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                PC Webcam
              </button>
              <button
                onClick={() => setUseIPCam(true)}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Mobile IP Cam
              </button>
            </div>
            {useIPCam && (
              <input
                type="text"
                value={ipCamUrl}
                onChange={(e) => setIpCamUrl(e.target.value)}
                placeholder="http://192.168.xx.xx:8080/video"
                className="border p-2 mb-4 w-full max-w-md"
              />
            )}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <canvas
              ref={canvasRef}
              width="720"
              height="560"
              className="absolute inset-0"
            />
          </div>

          {/* Attendance List */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center">
            <p>
              ✅ Present: <span className="text-green-600">{countPresent}</span>{" "}
              / Total: <span className="text-blue-600">{total}</span> | ❌
              Absent: <span className="text-red-600">{absent}</span>
            </p>
            <ul className="max-h-64 overflow-y-auto border p-2 rounded mt-4">
              {students.map((s) => (
                <li key={s._id} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    checked={!!attendance[s._id]}
                    onChange={(e) =>
                      setAttendance((prev) => ({
                        ...prev,
                        [s._id]: e.target.checked,
                      }))
                    }
                  />
                  <span>
                    {[s.fName, s.mName, s.lName].filter(Boolean).join(" ")} (
                    {s.rollNo_id})
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubmitAttendance}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg"
            >
              📩 Submit Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StdAttendance;
