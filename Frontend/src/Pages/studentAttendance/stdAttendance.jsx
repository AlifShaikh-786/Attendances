import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "@vladmandic/face-api";

const StdAttendance = () => {
  const [formdata, setFormData] = useState({
    Class: "",
    semester: "",
    div: "",
    Subject: "",
    Time: "",
    date: "",
  });

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models/";

  // Load face-api models once
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      console.log("✅ Models loaded from CDN");
    };
    loadModels();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  // Load students from backend
  const StdDetailSubmit = async (e) => {
    e.preventDefault();

    if (!isValidTime(formdata.Time)) {
      alert("❌ Time must be between 9:30 AM and 5:00 PM");
      return;
    }
    if (!formdata.Class || !formdata.semester || !formdata.div) {
      alert("Please select Class, Semester, and Division");
      return;
    }

    try {
      const response = await fetch("http://localhost:7070/api/StdDisplays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Class: formdata.Class,
          semester: formdata.semester,
          div: formdata.div,
        }),
      });

      const data = await response.json();
      if (response.ok && Array.isArray(data) && data.length > 0) {
        setStudents(data);

        const initialAttendance = {};
        data.forEach((s) => (initialAttendance[s._id] = false));
        setAttendance(initialAttendance);

        startVideo();
      } else {
        alert("❌ Student Details Not Found");
        setStudents([]);
        setAttendance({});
      }
    } catch (err) {
      alert("Server Error: " + err.message);
    }
  };

  const isValidTime = (inputTime) => {
    if (!inputTime) return false;
    const [hours, minutes] = inputTime.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return false;
    const input = new Date();
    input.setHours(hours, minutes, 0);
    const start = new Date();
    start.setHours(9, 30, 0);
    const end = new Date();
    end.setHours(17, 0, 0);
    return input >= start && input <= end;
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Webcam error:", err));
  };

  // Convert student DB faceDescriptor into LabeledFaceDescriptors
  const createLabeledDescriptors = () => {
    return students.map((student) => {
      const descriptors = student.faceDescriptor.map(
        (desc) => new Float32Array(desc)
      );
      return new faceapi.LabeledFaceDescriptors(student._id, descriptors);
    });
  };

  // useEffect(() => {
  //   if (students.length === 0) return;

  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   const labeledDescriptors = createLabeledDescriptors();
  //   const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

  //   const displaySize = { width: 720, height: 560 };
  //   faceapi.matchDimensions(canvas, displaySize);

  //   let intervalId;
  //   let lastMessageTime = 0;

  //   const onPlay = () => {
  //     intervalId = setInterval(async () => {
  //       if (video.paused || video.ended) return;

  //       const detections = await faceapi
  //         .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
  //         .withFaceLandmarks()
  //         .withFaceDescriptors();

  //       const resizedDetections = faceapi.resizeResults(
  //         detections,
  //         displaySize
  //       );

  //       const ctx = canvas.getContext("2d");
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       faceapi.draw.drawDetections(canvas, resizedDetections);

  //       resizedDetections.forEach((detection) => {
  //         const bestMatch = faceMatcher.findBestMatch(detection.descriptor);

  //         if (bestMatch.label !== "unknown") {
  //           // Mark present
  //           setAttendance((prev) => ({
  //             ...prev,
  //             [bestMatch.label]: true,
  //           }));
  //           setMessage(`✅ ${getStudentName(bestMatch.label)} marked Present`);
  //         } else {
  //           const now = Date.now();
  //           if (now - lastMessageTime > 3000) {
  //             setMessage("❌ You are not in loaded students");
  //             lastMessageTime = now;
  //           }
  //         }
  //       });
  //     }, 1500);
  //   };

  //   video.addEventListener("play", onPlay);

  //   return () => {
  //     video.removeEventListener("play", onPlay);
  //     clearInterval(intervalId);
  //   };
  // }, [students]);

  useEffect(() => {
    if (students.length === 0) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const labeledDescriptors = createLabeledDescriptors();
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

    const displaySize = { width: 720, height: 560 };
    faceapi.matchDimensions(canvas, displaySize);

    let intervalId;

    const onPlay = () => {
      intervalId = setInterval(async () => {
        if (video.paused || video.ended) return;

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw face boxes & landmarks
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        resizedDetections.forEach((detection) => {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);

          if (bestMatch.label !== "unknown") {
            // ✅ Mark that student present without overwriting others
            setAttendance((prev) => ({
              ...prev,
              [bestMatch.label]: true,
            }));

            // Draw label for recognized student
            const { x, y, width, height } = detection.detection.box;
            ctx.fillStyle = "rgba(0,255,0,0.6)";
            ctx.fillRect(
              x,
              y - 20,
              ctx.measureText(bestMatch.label).width + 10,
              20
            );
            ctx.fillStyle = "black";
            ctx.fillText(bestMatch.label, x + 5, y - 5);
          } else {
            // ❌ Not in loaded student list
            const { x, y, width, height } = detection.detection.box;
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

  const getStudentName = (id) => {
    const student = students.find((s) => s._id === id);
    return student ? student.stdName : "Unknown";
  };

  const handleSubmitAttendance = async () => {
    if (!formdata.Subject || !formdata.Time || !formdata.date) {
      alert("Please fill Subject, Time and Date before submitting attendance.");
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to save attendance?"
    );
    if (!confirmed) return;

    const attendanceList = students.map((student) => ({
      Class: formdata.Class,
      semester: formdata.semester,
      div: formdata.div,
      image: student.image ? student.image[0] : "",
      stdName: student.stdName,
      date: formdata.date,
      Time: formdata.Time,
      rollNo: student.rollNo,
      status: attendance[student._id] ? "Present" : "Absent",
      Subject: formdata.Subject,
    }));

    try {
      const response = await fetch("http://localhost:7070/api/AddAttendances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendanceList }),
      });

      if (response.ok) {
        alert("✅ Attendance saved successfully!");
      } else {
        const errorData = await response.json();
        alert(
          "Failed to save attendance: " + (errorData?.msg || "Unknown error")
        );
      }
    } catch (err) {
      alert("Error submitting attendance: " + err.message);
    }
  };

  const countPresent = Object.values(attendance).filter(Boolean).length;
  const total = students.length;
  const absent = total - countPresent;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Attendance Form */}
      <form
        onSubmit={StdDetailSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          🎯 Start Attendance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Class */}
          <select
            name="Class"
            value={formdata.Class}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="">-- Select Class --</option>
            <option value="MCA-II">MCA-II</option>
            <option value="MCA-I">MCA-I</option>
          </select>

          {/* Semester */}
          <select
            name="semester"
            value={formdata.semester}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="">-- Select Semester --</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>

          {/* Division */}
          <select
            name="div"
            value={formdata.div}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="">-- Select Division --</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>

          {/* Subject */}
          <input
            type="text"
            placeholder="Subject"
            name="Subject"
            value={formdata.Subject}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          {/* Time */}
          <input
            type="time"
            name="Time"
            value={formdata.Time}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formdata.date}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            📷 Load Students & Start Camera
          </button>
        </div>
      </form>

      {/* Camera Section */}
      {students.length > 0 && (
        <>
          <div className="relative w-[720px] h-[560px] mx-auto mt-6 border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <video
              ref={videoRef}
              width="720"
              height="560"
              autoPlay
              muted
              className="absolute inset-0"
            />
            <canvas
              ref={canvasRef}
              width="720"
              height="560"
              className="absolute inset-0"
            />
          </div>

          {message && (
            <div className="mt-4 text-center font-semibold text-lg text-green-600">
              {message}
            </div>
          )}

          {/* Attendance Count */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-800 font-medium">
              ✅ Present: <span className="text-green-600">{countPresent}</span>{" "}
              / Total: <span className="text-blue-600">{total}</span> | ❌
              Absent: <span className="text-red-600">{absent}</span>
            </p>
            <ul className="max-h-64 overflow-y-auto border p-2 rounded">
              //{" "}
              {students.map((student) => (
                <li
                  key={student._id}
                  className="flex items-center space-x-2 py-1"
                >
                  <input
                    type="checkbox"
                    checked={!!attendance[student._id]}
                    readOnly
                    id={`attend_${student._id}`}
                  />
                  <label htmlFor={`attend_${student._id}`}>
                    {student.stdName || student.name || "Unnamed Student"} (
                    {student.rollNo || student.RollNo})
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubmitAttendance}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              📩 Submit Attendance
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StdAttendance;
