import React, { useRef, useState, useEffect } from 'react';
import { useHttp } from '../../../hooks/useHttp';
import DotSpinner from '../../common/DotSpinner';

function VerifyOTPSuperAdmin({ email, password, onSuccess }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const { postReq } = useHttp();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (e, idx) => {
        const val = e.target.value.replace(/\D/, ''); // Only allow numbers
        if (!val) return;
        const newOtp = [...otp];
        newOtp[idx] = val;
        setOtp(newOtp);
        if (idx < 5 && val) {
            inputRefs.current[idx + 1]?.focus(); // Move focus to next input
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace') {
            if (otp[idx]) {
                const newOtp = [...otp];
                newOtp[idx] = ''; // Clear the current OTP digit
                setOtp(newOtp);
            } else if (idx > 0) {
                inputRefs.current[idx - 1]?.focus(); // Move focus to previous input
            }
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text').slice(0, 6).split('');
        if (paste.length === 6 && paste.every((d) => /\d/.test(d))) {
            setOtp(paste); // Paste the OTP digits directly
            inputRefs.current[5]?.focus();
        }
    };

    const handleResend = async () => {
        setResending(true);
        setError(null);
        try {
            const response = await postReq('/api/v1/superadmin/login', { email, password });
            if (response?.success) {
                setTimer(30); // Reset the timer to 30 seconds
            } else {
                setError(response?.message || 'Failed to resend OTP.');
            }
        } catch (err) {
            setError('Failed to resend OTP.');
        } finally {
            setResending(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (otp.some((d) => d === '')) {
            setError('Please enter all 6 digits.');
            return;
        }
        setLoading(true);
        try {
            const response = await postReq('/api/v1/superadmin/login/otp', {
                email,
                otp: otp.join(''),
            });

            console.log("OTP Response:", response); // Log the entire response

            if (response?.success && response?.data) {
                const { accessToken, role } = response.data;

                // Check if role is available
                if (role) {
                    console.log("Access Token:", accessToken); // Log the access token
                    console.log("Role:", role); // Log the role
                    
                    // Save the access token and role in localStorage and sessionStorage
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('role', role); // Save role properly
                    sessionStorage.setItem('accessToken', accessToken);
                    sessionStorage.setItem('role', role); // Save role in lowercase

                    // Call the onSuccess callback with the necessary data
                    if (onSuccess) {
                        console.log("Calling onSuccess with:", accessToken, role);
                        onSuccess(accessToken, role); 
                    }
                } else {
                    setError('Role not found in response.');
                }
            } else {
                console.log("Failed OTP Verification:", response); // Log failure message
                setError(response?.message || 'OTP verification failed.');
            }
        } catch (err) {
            console.error("OTP Verification Error:", err); // Log the error in case of failure
            setError('OTP verification failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-[30px] md:p-[50px] lg:py-[60px] urbanist relative">
            <div className={`w-full max-w-lg space-y-8 ${loading ? "pointer-events-none opacity-50" : ""}`}>
                <div className="text-center w-full">
                    <h1 className="text-4xl font-bold flex flex-col gap-2">
                        <span className="text-[#367AFF]">Verify OTP</span>
                        <span className="text-black">Super Admin Login</span>
                    </h1>
                    <p className="mt-2 text-base text-[#969696] inter">
                        We've sent a one-time password (OTP) to your registered email address. Please enter the 6-digit code below to complete your sign-in as Superadmin.
                    </p>
                </div>

                <form className="space-y-6 inter text-gray-600" onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-3" onPaste={handlePaste}>
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={(el) => (inputRefs.current[idx] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, idx)}
                                onKeyDown={(e) => handleKeyDown(e, idx)}
                                className="w-14 h-14 text-2xl text-center border border-gray-200 rounded-lg bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                                autoFocus={idx === 0}
                                disabled={loading}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        {timer > 0 ? (
                            <span className="text-blue-500 text-sm cursor-not-allowed select-none">
                                Resend in {timer}s
                            </span>
                        ) : (
                            <button
                                type="button"
                                className="text-blue-500 text-sm hover:underline"
                                onClick={handleResend}
                                disabled={resending || loading}
                            >
                                {resending ? 'Resending...' : 'Resend'}
                            </button>
                        )}
                    </div>

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-2 px-20 rounded-md transition duration-200"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                        {loading && (
                            <div className="mt-3">
                                <DotSpinner size={24} />
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VerifyOTPSuperAdmin;
