import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginComp = (props) => {
  const navigate = useNavigate();
  const handleOnSucess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await axios.post(
        "http://localhost:4000/api/auth/google",
        { token },
        { withCredentials: true }
      );

      // console.log("Google login success:", res.data);

      // Optional: Save to localStorage
      // console.log(res);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      // props.changeLoginValue(true);
      navigate("/feeds");
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleOnSucess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleLoginComp;
