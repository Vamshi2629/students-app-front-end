// src/pages/SetPassword.jsx
import { useState } from "react";
import { setPassword } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const [password, setPasswordValue] = useState("");
  const email = localStorage.getItem("authEmail");
  const navigate = useNavigate();

  const handleSetPassword = async () => {
    const res = await setPassword({ email, password });
    const data = await res.json();
    if (res.ok) {
      alert("Password set successfully. You are logged in.");
      navigate("/"); // or /dashboard
    } else {
      alert(data.message || "Failed to set password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Set Password</h2>
        <input
          className="w-full p-2 mb-3 border rounded"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <button
          onClick={handleSetPassword}
          className="bg-purple-500 text-white w-full py-2 rounded hover:bg-purple-600"
        >
          Set Password
        </button>
      </div>
    </div>
  );
};

export default SetPassword;
