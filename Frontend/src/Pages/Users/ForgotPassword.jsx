import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("email");
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7070/api/sendOtpToEmail-s",
        {
          email: form.email,
        }
      );
      setMessage(res.data.msg || "Email send successfily ");
      setStep("reset");
      setTimer(120); // 2 minutes
      setDisableButton(true);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error sending OTP");
    }
  };

  const handleReset = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7070/api/resetPasswordWithOtp-s",
        form
      );
      setMessage(res.data.msg);
      setTimeout(() => navigate("/"), 2000); // Redirect after success
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error resetting password");
    }
  };

  const handleResendOtp = async () => {
    if (!disableButton) {
      await handleSendOtp();
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setDisableButton(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-400">
      <Navbar />
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {step === "email" ? "Forgot Password" : "Reset Password"}
        </h2>

        {/* Email Input */}
        <div className="mb-4 ">
          <div className="flex flex-row">
            <label className="block text-gray-700 font-medium mb-1">
              Email{" "}
            </label>
            <span className="text-red-600 pl-1"> *</span>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            disabled={step === "reset"}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-200"
          />
        </div>

        {step === "email" ? (
          <>
            {/* Send OTP Button */}
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            {/* OTP Input */}
            <div className="mb-4 mt-4">
              <label className="block text-gray-700 font-medium mb-1">
                OTP
              </label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={form.newPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 mb-3"
            >
              Reset Password
            </button>

            {/* Resend OTP Button */}
            <button
              onClick={handleResendOtp}
              disabled={disableButton}
              className={`w-full py-2 rounded-lg text-white ${
                disableButton
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {disableButton ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </>
        )}

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}

        {/* Back to Login */}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 text-blue-500 hover:underline text-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
