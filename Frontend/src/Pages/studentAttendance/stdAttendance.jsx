// import React, { useState, useEffect, useRef } from "react";
// import * as faceapi from "@vladmandic/face-api";

// const StdAttendance = () => {
//   const [formdata, setFormData] = useState({
//     Class: "",
//     semester: "",
//     div: "",
//     Subject: "",
//     Time: "",
//     date: "",
//   });

//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [message, setMessage] = useState("");

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models/";

//   // Load face-api models once
//   useEffect(() => {
//     const loadModels = async () => {
//       await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//       console.log("✅ Models loaded from CDN");
//     };
//     loadModels();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formdata, [e.target.name]: e.target.value });
//   };

//   const isValidTime = (inputTime) => {
//     if (!inputTime) return false;
//     const [hours, minutes] = inputTime.split(":").map(Number);
//     if (isNaN(hours) || isNaN(minutes)) return false;
//     const input = new Date();
//     input.setHours(hours, minutes, 0);
//     const start = new Date();
//     start.setHours(9, 30, 0);
//     const end = new Date();
//     end.setHours(17, 0, 0);
//     return input >= start && input <= end;
//   };

//   const startVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: {} })
//       .then((stream) => {
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       })
//       .catch((err) => console.error("Webcam error:", err));
//   };

//   const StdDetailSubmit = async (e) => {
//     e.preventDefault();

//     if (!isValidTime(formdata.Time)) {
//       alert("❌ Time must be between 9:30 AM and 5:00 PM");
//       return;
//     }
//     if (!formdata.Class || !formdata.semester || !formdata.div) {
//       alert("Please select Class, Semester, and Division");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:7070/api/StdDisplays", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           Class: formdata.Class,
//           semester: formdata.semester,
//           div: formdata.div,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok && Array.isArray(data) && data.length > 0) {
//         setStudents(data);
//         const initialAttendance = {};
//         data.forEach((s) => (initialAttendance[s._id] = false));
//         setAttendance(initialAttendance);
//         startVideo();
//       } else {
//         alert("❌ Student Details Not Found");
//         setStudents([]);
//         setAttendance({});
//       }
//     } catch (err) {
//       alert("Server Error: " + err.message);
//     }
//   };

//   const createLabeledDescriptors = () =>
//     students.map((student) => {
//       const descriptors = student.faceDescriptor.map(
//         (desc) => new Float32Array(desc)
//       );
//       return new faceapi.LabeledFaceDescriptors(student._id, descriptors);
//     });

//   useEffect(() => {
//     if (students.length === 0) return;

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const labeledDescriptors = createLabeledDescriptors();
//     const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
//     const displaySize = { width: 720, height: 560 };
//     faceapi.matchDimensions(canvas, displaySize);

//     let intervalId;

//     const onPlay = () => {
//       intervalId = setInterval(async () => {
//         if (video.paused || video.ended) return;

//         const detections = await faceapi
//           .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks()
//           .withFaceDescriptors();

//         const resizedDetections = faceapi.resizeResults(
//           detections,
//           displaySize
//         );
//         const ctx = canvas.getContext("2d");
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

//         resizedDetections.forEach((detection) => {
//           const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
//           const { x, y } = detection.detection.box;

//           if (bestMatch.label !== "unknown") {
//             setAttendance((prev) => ({ ...prev, [bestMatch.label]: true }));
//             ctx.fillStyle = "rgba(0,255,0,0.6)";
//             ctx.fillRect(
//               x,
//               y - 20,
//               ctx.measureText(bestMatch.label).width + 10,
//               20
//             );
//             ctx.fillStyle = "black";
//             ctx.fillText(bestMatch.label, x + 5, y - 5);
//           } else {
//             ctx.fillStyle = "rgba(255,0,0,0.6)";
//             ctx.fillRect(
//               x,
//               y - 20,
//               ctx.measureText("Not in list").width + 10,
//               20
//             );
//             ctx.fillStyle = "white";
//             ctx.fillText("Not in list", x + 5, y - 5);
//           }
//         });
//       }, 1000);
//     };

//     video.addEventListener("play", onPlay);
//     return () => {
//       video.removeEventListener("play", onPlay);
//       clearInterval(intervalId);
//     };
//   }, [students]);

//   const getStudentName = (id) => {
//     const student = students.find((s) => s._id === id);
//     return student ? student.stdName : "Unknown";
//   };

//   const handleSubmitAttendance = async () => {
//     if (!formdata.Subject || !formdata.Time || !formdata.date) {
//       alert("Please fill Subject, Time and Date before submitting attendance.");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to save attendance?")) return;

//     const attendanceList = students.map((student) => ({
//       Class: formdata.Class,
//       semester: formdata.semester,
//       div: formdata.div,
//       image: student.image?.[0] || "",
//       stdName: student.stdName,
//       date: formdata.date,
//       Time: formdata.Time,
//       rollNo: student.rollNo,
//       status: attendance[student._id] ? "Present" : "Absent",
//       Subject: formdata.Subject,
//     }));

//     try {
//       const response = await fetch("http://localhost:7070/api/AddAttendances", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ attendanceList }),
//       });

//       if (response.ok) alert("✅ Attendance saved successfully!");
//       else {
//         const errorData = await response.json();
//         alert(
//           "Failed to save attendance: " + (errorData?.msg || "Unknown error")
//         );
//       }
//     } catch (err) {
//       alert("Error submitting attendance: " + err.message);
//     }
//   };

//   const countPresent = Object.values(attendance).filter(Boolean).length;
//   const total = students.length;
//   const absent = total - countPresent;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="flex gap-3 justify-center mt-6">
//         <img
//           src="/Assets/DYPIMED-Logo.png"
//           alt="DYPIMED Logo"
//           className="w-20 h-20 animate-bounce"
//         />
//         <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 font-extrabold text-2xl md:text-3xl select-none drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]">
//           DYPIMED
//         </h3>
//       </div>

//       {/* Attendance Form */}
//       <form
//         onSubmit={StdDetailSubmit}
//         className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200"
//       >
//         <h2 className="text-2xl font-bold text-gray-800 text-center">
//           🎯 Start Attendance
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <select
//             name="Class"
//             value={formdata.Class}
//             onChange={handleChange}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="">-- Select Class --</option>
//             <option value="MCA-II">MCA-II</option>
//             <option value="MCA-I">MCA-I</option>
//           </select>
//           <select
//             name="semester"
//             value={formdata.semester}
//             onChange={handleChange}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="">-- Select Semester --</option>
//             <option value="I">I</option>
//             <option value="II">II</option>
//             <option value="III">III</option>
//             <option value="IV">IV</option>
//           </select>
//           <select
//             name="div"
//             value={formdata.div}
//             onChange={handleChange}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="">-- Select Division --</option>
//             <option value="A">A</option>
//             <option value="B">B</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Subject"
//             name="Subject"
//             value={formdata.Subject}
//             onChange={handleChange}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           />
//           <input
//             type="time"
//             name="Time"
//             value={formdata.Time}
//             onChange={handleChange}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           />
//           <input
//             type="date"
//             name="date"
//             value={formdata.date}
//             onChange={handleChange}
//             max={new Date().toISOString().split("T")[0]}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>
//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
//           >
//             📷 Load Students & Start Camera
//           </button>
//         </div>
//       </form>

//       {/* Camera & Attendance */}
//       {students.length > 0 && (
//         <>
//           <div className="relative w-[720px] h-[560px] mx-auto mt-6 border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg">
//             <video
//               ref={videoRef}
//               width="720"
//               height="560"
//               autoPlay
//               muted
//               className="absolute inset-0"
//             />
//             <canvas
//               ref={canvasRef}
//               width="720"
//               height="560"
//               className="absolute inset-0"
//             />
//           </div>

//           {message && (
//             <div className="mt-4 text-center font-semibold text-lg text-green-600">
//               {message}
//             </div>
//           )}

//           <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center">
//             <p className="text-gray-800 font-medium">
//               ✅ Present: <span className="text-green-600">{countPresent}</span>{" "}
//               / Total: <span className="text-blue-600">{total}</span> | ❌
//               Absent: <span className="text-red-600">{absent}</span>
//             </p>
//             <ul className="max-h-64 overflow-y-auto border p-2 rounded">
//               {students.map((student) => (
//                 <li
//                   key={student._id}
//                   className="flex items-center space-x-2 py-1"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={!!attendance[student._id]}
//                     readOnly
//                     id={`attend_${student._id}`}
//                   />
//                   <label htmlFor={`attend_${student._id}`}>
//                     {student.stdName || student.name || "Unnamed Student"} (
//                     {student.rollNo || student.RollNo})
//                   </label>
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={handleSubmitAttendance}
//               className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
//             >
//               📩 Submit Attendance
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default StdAttendance;

// =============================================================================================================================================

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
      // await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      // await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      // await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL); // Fast detection
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL); // High-accuracy recognition

      console.log("✅ Models loaded from CDN");
    };
    loadModels();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
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
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Webcam error:", err));
  };

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

  const createLabeledDescriptors = () =>
    students.map((student) => {
      const descriptors = student.faceDescriptor.map(
        (desc) => new Float32Array(desc)
      );
      return new faceapi.LabeledFaceDescriptors(student._id, descriptors);
    });

  useEffect(() => {
    if (students.length === 0) return;

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

        // const detections = await faceapi
        //   // .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        //   // .detectAllFaces(
        //   //   video,
        //   //   new faceapi.SsdMobilenetv1Options({ minConfidence: 0.65 })
        //   // )
        //   .detectAllFaces(
        //     video,
        //     new faceapi.TinyFaceDetectorOptions({
        //       inputSize: 416,
        //       scoreThreshold: 0.6,
        //     })
        //   )
        //   .withFaceLandmarks()
        //   .withFaceDescriptors();

        // const resizedDetections = faceapi.resizeResults(
        //   detections,
        //   displaySize
        // );
        // const ctx = canvas.getContext("2d");
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // faceapi.draw.drawDetections(canvas, resizedDetections);
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        // resizedDetections.forEach((detection) => {
        //   const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
        //   const { x, y } = detection.detection.box;

        //   if (bestMatch.label !== "unknown") {
        //     setAttendance((prev) => ({ ...prev, [bestMatch.label]: true }));
        //     ctx.fillStyle = "rgba(0,255,0,0.6)";
        //     ctx.fillRect(
        //       x,
        //       y - 20,
        //       ctx.measureText(bestMatch.label).width + 10,
        //       20
        //     );
        //     ctx.fillStyle = "black";
        //     ctx.fillText(bestMatch.label, x + 5, y - 5);
        //   } else {
        //     ctx.fillStyle = "rgba(255,0,0,0.6)";
        //     ctx.fillRect(
        //       x,
        //       y - 20,
        //       ctx.measureText("Not in list").width + 10,
        //       20
        //     );
        //     ctx.fillStyle = "white";
        //     ctx.fillText("Not in list", x + 5, y - 5);
        //   }
        // });
        const detections = await faceapi
          .detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 416,
              scoreThreshold: 0.6,
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

        resizedDetections.forEach((detection) => {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          const { x, y } = detection.detection.box;

          if (bestMatch.label !== "unknown") {
            setAttendance((prev) => ({ ...prev, [bestMatch.label]: true }));
            ctx.fillStyle = "rgba(0,255,0,0.6)";
            // ctx.fillRect(
            //   x,
            //   y - 20,
            //   ctx.measureText(bestMatch.label).width + 10,
            //   20
            // );
            // ctx.fillStyle = "black";
            // ctx.fillText(bestMatch.label, x + 5, y - 5);
            const studentName = getStudentName(bestMatch.label);
            ctx.fillRect(
              x,
              y - 20,
              ctx.measureText(studentName).width + 10,
              20
            );
            ctx.fillStyle = "black";
            ctx.fillText(studentName, x + 5, y - 5);
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

  const getStudentName = (id) => {
    const student = students.find((s) => s._id === id);
    return student ? student.stdName : "Unknown";
  };

  const handleSubmitAttendance = async () => {
    if (!formdata.Subject || !formdata.Time || !formdata.date) {
      alert("Please fill Subject, Time and Date before submitting attendance.");
      return;
    }

    if (!window.confirm("Are you sure you want to save attendance?")) return;

    const attendanceList = students.map((student) => ({
      Class: formdata.Class,
      semester: formdata.semester,
      div: formdata.div,
      image: student.image?.[0] || "",
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

      if (response.ok) alert("✅ Attendance saved successfully!");
      else {
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
      {/* Header */}
      <div className="flex gap-3 justify-center mt-6">
        <img
          src="/Assets/DYPIMED-Logo.png"
          alt="DYPIMED Logo"
          className="w-20 h-20 animate-bounce"
        />
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 font-extrabold text-2xl md:text-3xl select-none drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]">
          DYPIMED
        </h3>
      </div>

      {/* Attendance Form */}
      <form
        onSubmit={StdDetailSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200"
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
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
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
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
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
            // required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">-- Select Division --</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          <input
            type="text"
            placeholder="Subject"
            name="Subject"
            value={formdata.Subject}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="time"
            name="Time"
            value={formdata.Time}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="date"
            name="date"
            value={formdata.date}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            📷 Load Students & Start Camera
          </button>
        </div>
      </form>
      {/* <select id="cameraSelect"></select>
      <video id="video" width="720" height="560" autoplay muted></video> */}

      {/* Camera & Attendance */}
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

          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-800 font-medium">
              ✅ Present: <span className="text-green-600">{countPresent}</span>{" "}
              / Total: <span className="text-blue-600">{total}</span> | ❌
              Absent: <span className="text-red-600">{absent}</span>
            </p>
            <ul className="max-h-64 overflow-y-auto border p-2 rounded">
              {students.map((student) => (
                <li
                  key={student._id}
                  className="flex items-center space-x-2 py-1"
                >
                  {/* <input
                    type="checkbox"
                    checked={!!attendance[student._id]}
                    readOnly
                    id={`attend_${student._id}`}
                  /> */}
                  <input
                    type="checkbox"
                    checked={!!attendance[student._id]}
                    onChange={(e) =>
                      setAttendance((prev) => ({
                        ...prev,
                        [student._id]: e.target.checked,
                      }))
                    }
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

// =================================================================================================================================

// import React, { useState, useEffect, useRef } from "react";
// import * as faceapi from "@vladmandic/face-api";

// const StdAttendance = () => {
//   const [formdata, setFormData] = useState({
//     Class: "",
//     semester: "",
//     div: "",
//     Subject: "",
//     Time: "",
//     date: "",
//   });

//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [message, setMessage] = useState("");

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models/";

//   // Load face-api models once
//   useEffect(() => {
//     const loadModels = async () => {
//       // await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//       // await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//       // await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//       await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL); // Fast detection
//       await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//       await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL); // High-accuracy recognition

//       console.log("✅ Models loaded from CDN");
//     };
//     loadModels();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formdata, [e.target.name]: e.target.value });
//   };

//   const isValidTime = (inputTime) => {
//     if (!inputTime) return false;
//     const [hours, minutes] = inputTime.split(":").map(Number);
//     if (isNaN(hours) || isNaN(minutes)) return false;
//     const input = new Date();
//     input.setHours(hours, minutes, 0);
//     const start = new Date();
//     start.setHours(9, 30, 0);
//     const end = new Date();
//     end.setHours(17, 0, 0);
//     return input >= start && input <= end;
//   };
//   const [useIPCam, setUseIPCam] = useState(false);
//   const [ipCamUrl, setIpCamUrl] = useState("http://192.168.43.1:8080/video");
//   const startVideo = () => {
//     navigator.mediaDevices

//       .getUserMedia({
//         video: { facingMode: { ideal: "environment" } }, // rear camera
//         audio: false,
//       })
//       .then((stream) => {
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       })
//       .catch((err) => {
//         console.error("Camera error:", err);
//         alert("Camera access denied or unavailable.");
//       });
//   };
//   const startIPWebcam = () => {
//     if (videoRef.current) {
//       videoRef.current.srcObject = null; // clear old webcam stream
//       videoRef.current.src = ipCamUrl; // phone stream
//       videoRef.current.play();
//     }
//   };

//   useEffect(() => {
//     if (useIPCam) {
//       startIPWebcam();
//     } else {
//       startVideo();
//     }
//   }, [useIPCam, ipCamUrl]);
//   const StdDetailSubmit = async (e) => {
//     e.preventDefault();

//     if (!isValidTime(formdata.Time)) {
//       alert("❌ Time must be between 9:30 AM and 5:00 PM");
//       return;
//     }
//     if (!formdata.Class || !formdata.semester || !formdata.div) {
//       alert("Please select Class, Semester, and Division");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:7070/api/StdDisplays", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           Class: formdata.Class,
//           semester: formdata.semester,
//           div: formdata.div,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok && Array.isArray(data) && data.length > 0) {
//         setStudents(data);
//         const initialAttendance = {};
//         data.forEach((s) => (initialAttendance[s._id] = false));
//         setAttendance(initialAttendance);
//         startVideo();
//       } else {
//         alert("❌ Student Details Not Found");
//         setStudents([]);
//         setAttendance({});
//       }
//     } catch (err) {
//       alert("Server Error: " + err.message);
//     }
//   };

//   const createLabeledDescriptors = () =>
//     students.map((student) => {
//       const descriptors = student.faceDescriptor.map(
//         (desc) => new Float32Array(desc)
//       );
//       return new faceapi.LabeledFaceDescriptors(student._id, descriptors);
//     });

//   useEffect(() => {
//     if (students.length === 0) return;

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const labeledDescriptors = createLabeledDescriptors();
//     const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.4);
//     const displaySize = { width: 720, height: 560 };
//     faceapi.matchDimensions(canvas, displaySize);

//     let intervalId;

//     const onPlay = () => {
//       intervalId = setInterval(async () => {
//         if (video.paused || video.ended) return;

//         // const detections = await faceapi
//         //   // .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//         //   // .detectAllFaces(
//         //   //   video,
//         //   //   new faceapi.SsdMobilenetv1Options({ minConfidence: 0.65 })
//         //   // )
//         //   .detectAllFaces(
//         //     video,
//         //     new faceapi.TinyFaceDetectorOptions({
//         //       inputSize: 416,
//         //       scoreThreshold: 0.6,
//         //     })
//         //   )
//         //   .withFaceLandmarks()
//         //   .withFaceDescriptors();

//         // const resizedDetections = faceapi.resizeResults(
//         //   detections,
//         //   displaySize
//         // );
//         // const ctx = canvas.getContext("2d");
//         // ctx.clearRect(0, 0, canvas.width, canvas.height);
//         // faceapi.draw.drawDetections(canvas, resizedDetections);
//         // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

//         // resizedDetections.forEach((detection) => {
//         //   const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
//         //   const { x, y } = detection.detection.box;

//         //   if (bestMatch.label !== "unknown") {
//         //     setAttendance((prev) => ({ ...prev, [bestMatch.label]: true }));
//         //     ctx.fillStyle = "rgba(0,255,0,0.6)";
//         //     ctx.fillRect(
//         //       x,
//         //       y - 20,
//         //       ctx.measureText(bestMatch.label).width + 10,
//         //       20
//         //     );
//         //     ctx.fillStyle = "black";
//         //     ctx.fillText(bestMatch.label, x + 5, y - 5);
//         //   } else {
//         //     ctx.fillStyle = "rgba(255,0,0,0.6)";
//         //     ctx.fillRect(
//         //       x,
//         //       y - 20,
//         //       ctx.measureText("Not in list").width + 10,
//         //       20
//         //     );
//         //     ctx.fillStyle = "white";
//         //     ctx.fillText("Not in list", x + 5, y - 5);
//         //   }
//         // });
//         const detections = await faceapi
//           .detectAllFaces(
//             video,
//             new faceapi.TinyFaceDetectorOptions({
//               inputSize: 416,
//               scoreThreshold: 0.6,
//             })
//           )
//           .withFaceLandmarks()
//           .withFaceDescriptors();

//         const resizedDetections = faceapi.resizeResults(
//           detections,
//           displaySize
//         );

//         const ctx = canvas.getContext("2d");
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

//         resizedDetections.forEach((detection) => {
//           const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
//           const { x, y } = detection.detection.box;

//           if (bestMatch.label !== "unknown") {
//             setAttendance((prev) => ({ ...prev, [bestMatch.label]: true }));
//             ctx.fillStyle = "rgba(0,255,0,0.6)";
//             // ctx.fillRect(
//             //   x,
//             //   y - 20,
//             //   ctx.measureText(bestMatch.label).width + 10,
//             //   20
//             // );
//             // ctx.fillStyle = "black";
//             // ctx.fillText(bestMatch.label, x + 5, y - 5);
//             const studentName = getStudentName(bestMatch.label);
//             ctx.fillRect(
//               x,
//               y - 20,
//               ctx.measureText(studentName).width + 10,
//               20
//             );
//             ctx.fillStyle = "black";
//             ctx.fillText(studentName, x + 5, y - 5);
//           } else {
//             ctx.fillStyle = "rgba(255,0,0,0.6)";
//             ctx.fillRect(
//               x,
//               y - 20,
//               ctx.measureText("Not in list").width + 10,
//               20
//             );
//             ctx.fillStyle = "white";
//             ctx.fillText("Not in list", x + 5, y - 5);
//           }
//         });
//       }, 1000);
//     };

//     video.addEventListener("play", onPlay);
//     return () => {
//       video.removeEventListener("play", onPlay);
//       clearInterval(intervalId);
//     };
//   }, [students]);

//   const getStudentName = (id) => {
//     const student = students.find((s) => s._id === id);
//     return student ? student.stdName : "Unknown";
//   };

//   const handleSubmitAttendance = async () => {
//     if (!formdata.Subject || !formdata.Time || !formdata.date) {
//       alert("Please fill Subject, Time and Date before submitting attendance.");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to save attendance?")) return;

//     const attendanceList = students.map((student) => ({
//       Class: formdata.Class,
//       semester: formdata.semester,
//       div: formdata.div,
//       image: student.image?.[0] || "",
//       stdName: student.stdName,
//       date: formdata.date,
//       Time: formdata.Time,
//       rollNo: student.rollNo,
//       status: attendance[student._id] ? "Present" : "Absent",
//       Subject: formdata.Subject,
//     }));

//     try {
//       const response = await fetch("http://localhost:7070/api/AddAttendances", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ attendanceList }),
//       });

//       if (response.ok) alert("✅ Attendance saved successfully!");
//       else {
//         const errorData = await response.json();
//         alert(
//           "Failed to save attendance: " + (errorData?.msg || "Unknown error")
//         );
//       }
//     } catch (err) {
//       alert("Error submitting attendance: " + err.message);
//     }
//   };

//   const countPresent = Object.values(attendance).filter(Boolean).length;
//   const total = students.length;
//   const absent = total - countPresent;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="flex gap-3 justify-center mt-6">
//         <img
//           src="/Assets/DYPIMED-Logo.png"
//           alt="DYPIMED Logo"
//           className="w-20 h-20 animate-bounce"
//         />
//         <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 font-extrabold text-2xl md:text-3xl select-none drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]">
//           DYPIMED
//         </h3>
//       </div>

//       {/* Attendance Form */}
//       <form
//         onSubmit={StdDetailSubmit}
//         className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200"
//       >
//         <h2 className="text-2xl font-bold text-gray-800 text-center">
//           🎯 Start Attendance
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <select
//             name="Class"
//             value={formdata.Class}
//             onChange={handleChange}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="">-- Select Class --</option>
//             <option value="MCA-II">MCA-II</option>
//             <option value="MCA-I">MCA-I</option>
//           </select>
//           <select
//             name="semester"
//             value={formdata.semester}
//             onChange={handleChange}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="">-- Select Semester --</option>
//             <option value="I">I</option>
//             <option value="II">II</option>
//             <option value="III">III</option>
//             <option value="IV">IV</option>
//           </select>
//           <select
//             name="div"
//             value={formdata.div}
//             onChange={handleChange}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="">-- Select Division --</option>
//             <option value="A">A</option>
//             <option value="B">B</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Subject"
//             name="Subject"
//             value={formdata.Subject}
//             onChange={handleChange}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           />
//           <input
//             type="time"
//             name="Time"
//             value={formdata.Time}
//             onChange={handleChange}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           />
//           <input
//             type="date"
//             name="date"
//             value={formdata.date}
//             onChange={handleChange}
//             max={new Date().toISOString().split("T")[0]}
//             required
//             className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>
//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
//           >
//             📷 Load Students & Start Camera
//           </button>
//         </div>
//       </form>
//       {/* <select id="cameraSelect"></select>
//       <video id="video" width="720" height="560" autoplay muted></video> */}

//       {/* Camera & Attendance */}
//       {students.length > 0 && (
//         <>
//           <div className="relative w-[720px] h-[560px] mx-auto mt-6 border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg">
//             {/* <video
//               ref={videoRef}
//               width="720"
//               height="560"
//               src="http://192.168.xx.xx:8080/video"
//               autoPlay
//               playsInline
//               muted
//               className="absolute inset-0"
//             /> */}
//             <div className="flex gap-4 mb-4">
//               <button
//                 onClick={() => setUseIPCam(false)}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Use PC Webcam
//               </button>
//               <button
//                 onClick={() => setUseIPCam(true)}
//                 className="px-4 py-2 bg-green-500 text-white rounded"
//               >
//                 Use Mobile IP Camera
//               </button>
//             </div>

//             {/* Input for IP Cam URL */}
//             {useIPCam && (
//               <input
//                 type="text"
//                 value={ipCamUrl}
//                 onChange={(e) => setIpCamUrl(e.target.value)}
//                 placeholder="http://192.168.xx.xx:8080/video"
//                 className="border p-2 mb-4 w-full max-w-md"
//               />
//             )}

//             {/* Video feed */}
//             <div className="relative w-full max-w-xl">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 muted
//                 playsInline
//                 className="w-full h-auto rounded-lg shadow-lg"
//               />
//             </div>
//             <canvas
//               ref={canvasRef}
//               width="720"
//               height="560"
//               className="absolute inset-0"
//             />
//           </div>

//           {message && (
//             <div className="mt-4 text-center font-semibold text-lg text-green-600">
//               {message}
//             </div>
//           )}

//           <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center">
//             <p className="text-gray-800 font-medium">
//               ✅ Present: <span className="text-green-600">{countPresent}</span>{" "}
//               / Total: <span className="text-blue-600">{total}</span> | ❌
//               Absent: <span className="text-red-600">{absent}</span>
//             </p>
//             <ul className="max-h-64 overflow-y-auto border p-2 rounded">
//               {students.map((student) => (
//                 <li
//                   key={student._id}
//                   className="flex items-center space-x-2 py-1"
//                 >
//                   {/* <input
//                     type="checkbox"
//                     checked={!!attendance[student._id]}
//                     readOnly
//                     id={`attend_${student._id}`}
//                   /> */}
//                   <input
//                     type="checkbox"
//                     checked={!!attendance[student._id]}
//                     onChange={(e) =>
//                       setAttendance((prev) => ({
//                         ...prev,
//                         [student._id]: e.target.checked,
//                       }))
//                     }
//                     id={`attend_${student._id}`}
//                   />

//                   <label htmlFor={`attend_${student._id}`}>
//                     {student.stdName || student.name || "Unnamed Student"} (
//                     {student.rollNo || student.RollNo})
//                   </label>
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={handleSubmitAttendance}
//               className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
//             >
//               📩 Submit Attendance
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default StdAttendance;
