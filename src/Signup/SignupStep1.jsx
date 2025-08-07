import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const SignupStep1 = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const sendOtp = async () => {
    setLoading(true);
    try {
      await axios.post("https://students-app-production.up.railway.app/api/auth/send-signup-otp", { email });
      toast.success("OTP sent to your email");
      onNext(email);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            onClick={sendOtp}
            disabled={loading}
            className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
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

export default SignupStep1;
