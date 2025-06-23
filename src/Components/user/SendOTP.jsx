import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp";

function SendOTP({ onSuccess, email: initialEmail = '' }) {
    const [email, setEmail] = useState(initialEmail);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { postReq } = useHttp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await postReq("/api/v1/user/sendForgetPasswordOtpEmail", { email });
            if (response?.success) {
                if (onSuccess) onSuccess(email);
            } else {
                setError(response?.message || "Failed to send OTP. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center p-[30px] md:p-[50px] lg:py-[60px] urbanist'>
            <div className="w-full max-w-lg space-y-8">
                <div className="text-center w-full">
                    <h1 className="text-4xl font-bold flex flex-col gap-2">
                        <span className="text-[#367AFF]">IEM Recruit Hub</span>
                        <div>Reset Your Password</div>
                    </h1>
                    <p className="mt-2 text-base text-[#969696] inter">
                        Enter your registered email address, and we'll send you a 6-digit OTP to verify your identity. Once verified, you can securely create a new password.
                    </p>
                </div>
                <form className="space-y-4 inter text-gray-600" onSubmit={handleSubmit}>
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
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-2 px-20 rounded-md transition duration-200 lg:mt-8 md:mt-4 mt-2"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SendOTP