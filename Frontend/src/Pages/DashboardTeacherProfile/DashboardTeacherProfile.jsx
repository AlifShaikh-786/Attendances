import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DashboardTeacherProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    photo: null,
    photoPreviewUrl: "",
    department: "",
    employeeId: "",
    qualification: "",
    yearsOfExperience: "",
    dateOfJoining: "",
    address: "",
    gender: "",
    dateOfBirth: "",
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch profile data on mount (adjust your API and data accordingly)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setProfile({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          photoPreviewUrl: data.photoUrl || "",
          department: data.department || "",
          employeeId: data.employeeId || "",
          qualification: data.qualification || "",
          yearsOfExperience: data.yearsOfExperience || "",
          dateOfJoining: data.dateOfJoining
            ? data.dateOfJoining.slice(0, 10)
            : "", // YYYY-MM-DD
          address: data.address || "",
          gender: data.gender || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.slice(0, 10) : "",
        });
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

  // Camera related methods (same as before)
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

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.fullName || !profile.email) {
      toast.error("Full Name and Email are required.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("fullName", profile.fullName);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);
      formData.append("department", profile.department);
      formData.append("employeeId", profile.employeeId);
      formData.append("qualification", profile.qualification);
      formData.append("yearsOfExperience", profile.yearsOfExperience);
      formData.append("dateOfJoining", profile.dateOfJoining);
      formData.append("address", profile.address);
      formData.append("gender", profile.gender);
      formData.append("dateOfBirth", profile.dateOfBirth);
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
        Teacher Profile Information
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block mb-2 font-semibold text-gray-300"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={profile.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              required
            />
          </div>

          {/* Phone Number */}
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
              placeholder="Enter phone number"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
          </div>

          {/* Department / Subject(s) Taught */}
          <div>
            <label
              htmlFor="department"
              className="block mb-2 font-semibold text-gray-300"
            >
              Department / Subject(s) Taught
            </label>
            <input
              id="department"
              name="department"
              type="text"
              value={profile.department}
              onChange={handleChange}
              placeholder="Enter department or subjects"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
          </div>

          {/* Employee ID / Staff Number */}
          <div>
            <label
              htmlFor="employeeId"
              className="block mb-2 font-semibold text-gray-300"
            >
              Employee ID / Staff Number
            </label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              value={profile.employeeId}
              onChange={handleChange}
              placeholder="Enter employee ID"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
          </div>

          {/* Qualification */}
          <div>
            <label
              htmlFor="qualification"
              className="block mb-2 font-semibold text-gray-300"
            >
              Qualification (e.g., M.Ed, PhD, B.Ed)
            </label>
            <input
              id="qualification"
              name="qualification"
              type="text"
              value={profile.qualification}
              onChange={handleChange}
              placeholder="Enter qualification"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
          </div>

          {/* Years of Experience */}
          <div>
            <label
              htmlFor="yearsOfExperience"
              className="block mb-2 font-semibold text-gray-300"
            >
              Years of Experience
            </label>
            <input
              id="yearsOfExperience"
              name="yearsOfExperience"
              type="number"
              min="0"
              value={profile.yearsOfExperience}
              onChange={handleChange}
              placeholder="Enter years of experience"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
          </div>

          {/* Date of Joining */}
          <div>
            <label
              htmlFor="dateOfJoining"
              className="block mb-2 font-semibold text-gray-300"
            >
              Date of Joining
            </label>
            <input
              id="dateOfJoining"
              name="dateOfJoining"
              type="date"
              value={profile.dateOfJoining}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block mb-2 font-semibold text-gray-300"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows={3}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 font-semibold text-gray-300"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block mb-2 font-semibold text-gray-300"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={profile.dateOfBirth}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
          </div>

          {/* Profile Photo Upload */}
          <div>
            <label
              htmlFor="photo"
              className="block mb-2 font-semibold text-gray-300"
            >
              Profile Photo (upload)
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

export default DashboardTeacherProfile;
