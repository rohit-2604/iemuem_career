import React, { useState } from "react";
import background from "../../assets/superadmin/back.png";
import front from "../../assets/superadmin/front.png";
import LogInSuperAdmin from "../../Components/superadmin/auth/LogInSuperAdmin";
import VerifyOTPSuperAdmin from "../../Components/superadmin/auth/VerifyOTPSuperAdmin";
import { useNavigate } from "react-router-dom";

function SuperAdminLogin() {
  const [step, setStep] = useState("login"); // 'login' or 'otp'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = (loginData) => {
    setEmail(loginData.email);
    setPassword(loginData.password);
    setKeepLoggedIn(loginData.keepLoggedIn);
    setStep("otp");
  };

  const handleOTPSuccess = (token, keepLoggedInValue) => {
    try {
      localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);
      if (keepLoggedInValue) {
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}`;
      }
    } catch (storageError) {
      console.error("⚠️ Error storing token:", storageError);
    }
    navigate("/superadmin/dashboard");
  };

  return (
    <div className="min-h-screen flex urbanist p-4 bg-white">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative rounded-xl overflow-hidden p-4">
        <img
          src={background}
          alt="Background Illustration"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <img
            src={front}
            alt="Front Illustration"
            className="object-contain max-w-[400px] max-h-[400px]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        {step === "login" ? (
          <LogInSuperAdmin onLoginSuccess={handleLoginSuccess} />
        ) : (
          <VerifyOTPSuperAdmin email={email} password={password} keepLoggedIn={keepLoggedIn} onSuccess={(token) => handleOTPSuccess(token, keepLoggedIn)} />
        )}
      </div>
    </div>
  );
}

export default SuperAdminLogin;
