import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; 

const ForgetPassword = () => {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const sendOtp = async () => {
        if (mobile.length !== 10) {
            setError("Enter a valid 10-digit mobile number");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const fullPhoneNumber = `+91${mobile}`;
            await api.post("/send-otp", { phoneNumber: fullPhoneNumber });
            alert("OTP Sent!");
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        try {
            setLoading(true);
            setError("");
            const fullPhoneNumber = `+91${mobile}`;
            await api.post("/verify-otp", { phoneNumber: fullPhoneNumber, otpCode: otp });
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || "OTP verification failed");
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const fullPhoneNumber = `+91${mobile}`;
            await api.post("/reset-password", { mobile: fullPhoneNumber, newPassword });
            alert("Password Reset Successful! Please Login Again.");

            setStep(1);
            setMobile("");
            setNewPassword("");
            setConfirmPassword("");
            setOtp("");

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-900 p-4">
            <motion.div
                className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 text-white"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-3xl font-bold text-center mb-6">
                    {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password"}
                </h2>

                {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                
                {step === 1 && (
    <>
        <div className="flex mb-4">
            <span className="flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l text-gray-800 font-medium">
                +91
            </span>
            <input
                type="text"
                placeholder="Enter Mobile Number"
                className="w-full p-3 rounded-r border border-gray-300 focus:outline-none text-black"
                value={mobile}
                onChange={(e) => /^\d{0,10}$/.test(e.target.value) && setMobile(e.target.value)}
            />
        </div>
        <button onClick={sendOtp} className="w-full bg-gray-700 py-3">
            {loading ? "Sending OTP..." : "Send OTP"}
        </button>
    </>
)}


                {step === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full p-3 mb-4"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={verifyOtp} className="w-full bg-green-500 py-3">
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        {/* New Password with toggle */}
                        <div className="relative mb-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                className="w-full p-3 pr-10 rounded"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>

                        {/* Confirm Password with toggle */}
                        <div className="relative mb-4">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-full p-3 pr-10 rounded"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>

                        <button onClick={resetPassword} className="w-full bg-purple-500 py-3">
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default ForgetPassword;
