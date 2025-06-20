import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import background from "../../assets/superadmin/back.png";
import front from "../../assets/superadmin/front.png";
import { useLogin } from "../../contexts/SuperAdmin/LoginContext";

function SuperAdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { isLogin, superAdminLogin } = useLogin();

  useEffect(() => {
    if (isLogin) {
      navigate("/superadmin/dashboard");
    }
  }, [isLogin, navigate]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  const response = await superAdminLogin(email, password, keepLoggedIn);

  if (!response?.success) {
    setError(response?.message || "Login failed");
    return;
  }

  const { token, updatePassword } = response;

  if (token) {
    try {

      localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);


      if (keepLoggedIn) {
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}`;
      }
    } catch (storageError) {
      console.error("⚠️ Error storing token:", storageError);
    }
  }

  if (updatePassword) {
    navigate("/update-password", { state: { role: "superadmin" } });
  } else {
    navigate("/superadmin/dashboard");
  }
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
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              <span className="text-[#367AFF]">Super Admin</span> Sign in
            </h1>
            <p className="mt-2 text-base text-[#969696] inter">
              Please enter your credentials to access the dashboard.
            </p>
          </div>

          <form className="space-y-6 inter" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xl font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xl font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="keep-logged-in"
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="keep-logged-in" className="ml-2 block text-base text-[#232323] inter">
                Keep me logged in
              </label>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Sign in
            </button>
              {/* <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-50 text-gray-500">or</span>
                    </div>
                    </div>

                    <button
                    type="button"
                    className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-black font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center space-x-2"
                    >
                    <span>Sign in with</span>
                    <img
                        src={Digilocker}
                        alt="Digilocker Logo"
                        className="h-5"
                        style={{ width: "80px", height: "20px" }}
                        loading="lazy"
                    />
                    </button> */}
            <div className="text-center inter">
              <p className="text-base text-[#6C6C6C]">
                Need an account?{" "}
                <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                  Create one
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminLogin;
