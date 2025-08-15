// src/components/GoogleLogin/googleLogin.jsx
import React from "react";
import { GoogleLogin as GoogleOAuthLogin } from "@react-oauth/google";

const GoogleLogin = ({ changeLoginValue }) => {
  return (
    <GoogleOAuthLogin
      onSuccess={(credentialResponse) => {
        console.log("Google login success:", credentialResponse);
        // You can call props.changeLoginValue or handle login here
        if (changeLoginValue) {
          changeLoginValue(true); // example
        }
      }}
      onError={() => {
        console.log("Google login failed");
      }}
    />
  );
};

export default GoogleLogin;
