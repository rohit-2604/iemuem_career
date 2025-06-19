import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import bgImage from '../../assets/user/UserSignup.png'
import { useHttp } from "../../hooks/useHttp";

function userRegister() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [DOB, setDOB] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { postReq } = useHttp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const name = firstName + " " + lastName;

        // Basic validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await postReq("/api/v1/user/register", {
                fullName: name,
                email,
                phoneNo,
                DOB,
                address,
                password

            });

            if (response?.success) {
                // Registration successful
                navigate("/user/login");
            } else {
                setError(response?.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className='bg-[#f3f3f3] h-screen w-full flex items-center justify-center lg:px-[6%] p-[20px]'>
            <div className='hidden lg:flex lg:w-1/2'>
                <img src={bgImage} alt="Illustration" className='w-full h-full object-cover' loading="lazy" />
            </div>
            <div className='lg:w-1/2 bg-white rounded-2xl shadow-2xl'>
                <div className='w-full h-full flex flex-col items-center justify-center p-[30px] md:p-[50px] lg:py-[60px] urbanist'>
                    <div className="w-full max-w-lg space-y-8">
                        <div className="text-center w-full">
                            <h1 className="text-4xl font-bold">
                                Sign Up to <span className="text-[#367AFF]">IEM Recruit Hub</span>
                            </h1>
                            <p className="mt-2 text-base text-[#969696] inter">
                                Create Your Career Account. Apply for jobs at IEM-UEM with one profile.
                            </p>
                        </div>
                        <form className="space-y-4 inter text-gray-600" onSubmit={handleSubmit}>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label htmlFor="firstName" className="block text-xs font-medium mb-1">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="lastName" className="block text-xs font-medium mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium mb-1">
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
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label htmlFor="phone" className="block text-xs font-medium mb-1">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="phone" className="block text-xs font-medium mb-1">
                                        Date of Birth
                                    </label>
                                    <input
                                        id="dob"
                                        type="date"
                                        value={DOB}
                                        onChange={(e) => setDOB(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-xs font-medium mb-1">
                                    Address
                                </label>
                                <div className="relative">
                                    <input
                                        id="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your address"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="password" className="block text-xs font-medium mb-1">
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
                                <div className="w-1/2">
                                    <label htmlFor="confirmPassword" className="block text-xs font-medium mb-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {error && <p className="text-red-600 text-sm">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-2 px-4 rounded-md transition duration-200 lg:mt-8 md:mt-4 mt-2 justify-center"
                            >
                                Create Account
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
                                    Already have an account?{" "}
                                    <a href="/user/login" className="text-[#367AFF] hover:text-blue-600 font-medium text-base">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default userRegister