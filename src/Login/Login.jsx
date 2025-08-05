import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login-animation.json"; // ✅ Prefer .json Lottie over .gif

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
         localStorage.setItem("user",JSON.stringify(result.user));

        toast.success("Login successful!", { position: "top-center", autoClose: 1000 });
        setTimeout(() => navigate("/home"), 1200);
      } else {
        toast.error(result.message || "Invalid credentials", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <ToastContainer />

      {/* Left Panel */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12"
      >
        <div className="max-w-md text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-6">Login to continue exploring your dashboard</p>
          <Lottie animationData={loginAnimation} loop={true} className="w-72 mx-auto" />
        </div>
      </motion.div>

      {/* Right Panel (Login Form) */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex w-full md:w-1/2 items-center justify-center bg-white shadow-lg"
      >
        <div className="p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 font-medium hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
