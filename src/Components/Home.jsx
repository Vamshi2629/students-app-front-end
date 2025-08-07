import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  const userName = "Vamshi"; // Replace this dynamically if needed
   const [name, setName] = useState();
   const navigate=useNavigate()
  
    // ✅ Fetch user ID from localStorage on mount
    // debugger
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.id) {
        setName(storedUser.name);
      }
    }, [name]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          Hi, {name}! 👋
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Welcome to <span className="font-semibold text-blue-600">BookFlip</span> — your personal book-style document reader 📚
        </p>

        <div className="text-gray-600 mb-6">
          <ul className="list-disc list-inside text-left space-y-2">
            <li>📤 Upload your PDF or document files</li>
            <li>📖 Experience real-time page flipping — like a real book!</li>
            <li>💾 Save and access your books anytime</li>
            <li>🎯 Designed for smooth, realistic reading experience</li>
          </ul>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md" onClick={()=>{
            navigate("/books")
        }}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
