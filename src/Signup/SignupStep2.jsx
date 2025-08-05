import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupStep2 = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        otp,
      });
      toast.success("Signup successful. Check your email for credentials.");
      setTimeout(() => {
        navigate("/"); // Navigate after short delay
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Complete Your Signup</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            onClick={signup}
            disabled={loading}
            className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already registered?{" "}
          <span
            className="text-indigo-500 font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Log In
          </span>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SignupStep2;
