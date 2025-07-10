import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import registerImg from "../assets/featured.webp"; // Replace with your image
import axios from "axios"; // 📌 Import Axios for API calls

const Register = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 📌 Hook to navigate after successful registration

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const { data } = await axios.post("http://localhost:9000/api/users/register", {
        name,
        mobile,
        email,
        password,
      });

      alert("Registration Successful! Please Login.");
      navigate("/login"); // 📌 Redirect user to login page after registration
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col md:flex-row min-h-screen relative overflow-hidden bg-gray-100"
    >
      {/* ✨ Glitter Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 opacity-30 blur-2xl animate-pulse"></div>

      {/* 🎭 Left Side (Register Form) */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative z-10"
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md bg-white bg-opacity-40 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-gray-400 shadow-lg"
        >
          <motion.h2
            className="text-xl font-medium text-center text-black mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            🚀 Welcome to Miracle Security
          </motion.h2>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-black">
            Create Your Account
          </h2>
          <p className="text-center text-gray-700 mb-6">Sign up to access exclusive security solutions.</p>

          {/* ✨ Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-lg bg-white bg-opacity-40 backdrop-blur-lg text-black placeholder-gray-500 shadow-md"
              placeholder="Enter your full name"
            />
          </div>

          
<div className="mb-4">
  <label className="block text-sm font-semibold text-black mb-2">
    Mobile Number (+91XXXXXXXXXX)
  </label>
  <div className="flex">
    <span className="px-4 flex items-center bg-gray-100 border border-gray-400 border-r-0 rounded-l-lg text-black font-medium">
      +91
    </span>
    <input
      type="text"
      value={mobile}
      onChange={(e) => {
        const value = e.target.value;
        // Only allow numbers and max 10 digits
        if (/^\d{0,10}$/.test(value)) {
          setMobile(value);
        }
      }}
      required
      className="w-full p-3 border border-gray-400 rounded-r-lg bg-white bg-opacity-40 backdrop-blur-lg text-black placeholder-gray-500 shadow-md focus:outline-none"
      placeholder="XXXXXXXXXX"
      inputMode="numeric"
      pattern="[0-9]*"
    />
  </div>
</div>


          {/* ✨ Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-lg bg-white bg-opacity-40 backdrop-blur-lg text-black placeholder-gray-500 shadow-md"
              placeholder="Enter your email"
            />
          </div>

          {/* 🔑 Password Input with Eye Icon */}
          <div className="mb-4 relative">
            <label className="block text-sm font-semibold text-black mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-lg bg-white bg-opacity-40 backdrop-blur-lg text-black shadow-md pr-10"
              placeholder="Create a strong password"
            />
            <span
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-gray-700" /> : <FaEye className="text-gray-700" />}
            </span>
          </div>

          {/* 🚀 Sign Up Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, backgroundColor: "#ffcc00", boxShadow: "0px 0px 15px rgba(255, 204, 0, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gray-500 text-black p-3 rounded-lg font-semibold hover:bg-gray-600 transition shadow-lg animate-pulse"
          >
            Sign Up
          </motion.button>

          <p className="mt-6 text-center text-sm text-black">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-600 hover:underline">
              Log In
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Register;
