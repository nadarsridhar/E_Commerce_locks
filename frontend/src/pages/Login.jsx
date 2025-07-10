import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import login from "../assets/featured.webp";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullPhoneNumber = `+91${phone}`;

    try {
      const response = await axios.post("http://localhost:9000/api/users/login", {
        mobile: fullPhoneNumber,
        password,
      });

      const { data } = response;
      console.log("Login Successful:", data);

      const isAdminUser = fullPhoneNumber === "+918080390855" && password === "Admin@123";
      data.user.isAdmin = isAdminUser;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");

      const redirectPath = location.state?.from === "/checkout" ? "/checkout" : "/profile";
      navigate(redirectPath);

    } catch (error) {
      console.error("Login Failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex min-h-screen relative overflow-hidden bg-gray-100"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 blur-xl opacity-50"
      ></motion.div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gray-200 opacity-30 w-8 h-8 rounded-full"
          animate={{
            x: [Math.random() * 100, Math.random() * 500],
            y: [Math.random() * 100, Math.random() * 500],
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 10 + Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 relative z-10"
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md bg-white bg-opacity-40 backdrop-blur-lg p-8 rounded-3xl border border-gray-500/30 shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <div className="flex">
              <span className="flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-lg text-gray-700">
                +91
              </span>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setPhone(value);
                  }
                }}
                required
                className="w-full p-3 rounded-r-lg border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="Enter password"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <Link to="/forgot-password" className="text-gray-700 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <p className="mt-4 text-center text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-gray-700 font-bold hover:underline">
              Register
            </Link>
          </p>
        </motion.form>
      </motion.div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden md:block w-1/2 bg-gray-100 relative z-10"
      >
        <div className="h-full flex flex-col justify-center items-center">
          <motion.img
            src={login}
            alt="Login to account"
            className="h-[750px] w-full object-cover rounded-lg shadow-xl"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
