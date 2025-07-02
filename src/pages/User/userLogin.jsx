import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "../../contexts/SuperAdmin/LoginContext";

function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { isLogin, userLogin } = useLogin();

    useEffect(() => {
        if (isLogin) {
            navigate("/user/dashboard");
        }
    }, [isLogin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await userLogin(email, password, keepLoggedIn);

        if (!response.success) {
            setError(response.message || "Login failed");
            return;
        }

        if (response.updatePassword) {
            navigate("/update-password", { state: { role: "user" } });
        } else {
            // Store the tokens in both localStorage and sessionStorage
            if (response.tokens) {
                const { accessToken, refreshToken } = response.tokens;

                // Storing tokens in both localStorage and sessionStorage
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);

                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("refreshToken", refreshToken);
            }

            navigate("/user/dashboard");
        }
    };

    return (
        <div className="bg-[#f3f3f3] h-screen w-full flex items-center justify-center lg:px-[6%] p-[20px]">
            <div className="hidden lg:flex lg:w-1/2">
                <img
                    src={"/UserSignIn.png"}
                    alt="Illustration"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className="lg:w-1/2 bg-white rounded-2xl shadow-2xl">
                <div className="w-full h-full flex flex-col items-center justify-center p-[30px] md:p-[50px] lg:py-[80px] urbanist">
                    <div className="w-full max-w-lg space-y-8">
                        <div className="text-center w-full">
                            <h1 className="text-4xl font-bold">
                                Sign in to <span className="text-[#367AFF]">IEM Recruit Hub</span>
                            </h1>
                            <p className="mt-2 text-base text-[#969696] inter">
                                Log in to track your job applications or apply for new positions.
                            </p>
                        </div>
                        <form className="space-y-4 inter" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium text-gray-700 mb-1"
                                >
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
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-medium text-gray-700 mb-1"
                                >
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

                            {error && <p className="text-red-600 text-sm">{error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-2 px-4 rounded-md transition duration-200"
                            >
                                Sign in
                            </button>

                            <div className="text-center inter">
                                <p className="text-base text-[#6C6C6C]">
                                    Don't have an account?{" "}
                                    <a
                                        href="/user/register"
                                        className="text-[#367AFF] hover:text-blue-600 font-medium text-base"
                                    >
                                        Create one
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
