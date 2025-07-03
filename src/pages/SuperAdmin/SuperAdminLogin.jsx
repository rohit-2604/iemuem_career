import React, { useState } from "react";
import LogInSuperAdmin from "../../Components/superadmin/auth/LogInSuperAdmin";
import VerifyOTPSuperAdmin from "../../Components/superadmin/auth/VerifyOTPSuperAdmin";
import { useNavigate } from "react-router-dom";

function SuperAdminLogin() {
  const [step, setStep] = useState("login"); // 'login' or 'otp'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Role state to store the user's role
  const [token, setToken] = useState(""); // Token state to store the user's token
  const navigate = useNavigate();

  const handleLoginSuccess = (loginData) => {
    setEmail(loginData.email);
    setPassword(loginData.password);
    setRole(loginData.role); // Assuming role is part of loginData
    setStep("otp");
  };

  const handleOTPSuccess = (receivedToken) => {
    // Set the token in state
    setToken(receivedToken);

    try {
      // Store both token and role in localStorage and sessionStorage
      localStorage.setItem("token", receivedToken);
      // localStorage.setItem("role", role); // Now we have both role and token
      sessionStorage.setItem("token", receivedToken);
      // sessionStorage.setItem("role", role); // Store role as well
    } catch (storageError) {
      console.error("⚠️ Error storing token:", storageError);
    }

    // Navigate to the dashboard after successful login
    navigate("/superadmin/dashboard");
  };

  return (
    <div className="min-h-screen flex urbanist p-4 bg-gray-50">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative rounded-xl overflow-hidden p-4">
        <img
          src={step === "otp" ? "/background2.png" : "/back.png"}
          alt="Background Illustration"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <img
            src={step === "otp" ? "/front2.png" : "/front.png"}
            alt="Front Illustration"
            className="object-contain max-w-[400px] max-h-[400px]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        {step === "login" ? (
          <LogInSuperAdmin onLoginSuccess={handleLoginSuccess} />
        ) : (
          <VerifyOTPSuperAdmin
            email={email}
            password={password}
            onSuccess={(receivedToken) => handleOTPSuccess(receivedToken)}
          />
        )}
      </div>
    </div>
  );
}

export default SuperAdminLogin;
