import React, { useState } from "react";
import bgImage from '../../assets/UserSignup.png'
import SendOTP from "../../Components/user/SendOTP";
import VerifyOTP from "../../Components/user/VerifyOTP";
import NewPasword from "../../Components/user/NewPasword";

function userRegister() {
    const [step, setStep] = useState('send'); // 'send', 'verify', 'newpass'
    const [email, setEmail] = useState("");
    const [accessToken, setAccessToken] = useState("");

    // Handler for SendOTP success
    const handleSendOTPSuccess = (sentEmail) => {
        setEmail(sentEmail);
        setStep('verify');
    };

    // Handler for VerifyOTP success
    const handleVerifyOTPSuccess = (token) => {
        setAccessToken(token);
        setStep('newpass');
    };

    return (
        <div className='bg-[#f3f3f3] h-screen w-full flex items-center justify-center lg:px-[6%] p-[60px]'>
            <div className='hidden lg:flex lg:w-1/2'>
                <img src={bgImage} alt="Illustration" className='w-full h-full object-cover' loading="lazy" />
            </div>
            <div className='lg:w-1/2 bg-white rounded-2xl shadow-2xl h-full'>
                {step === 'send' && (
                    <SendOTP onSuccess={handleSendOTPSuccess} />
                )}
                {step === 'verify' && (
                    <VerifyOTP email={email} onSuccess={handleVerifyOTPSuccess} />
                )}
                {step === 'newpass' && (
                    <NewPasword accessToken={accessToken} />
                )}
            </div>
        </div>
    )
}

export default userRegister