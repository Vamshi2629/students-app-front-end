import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const StudentsCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    class: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault(); // prevent page reload

  try {
    const res = await api.post('/students', {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      class: formData.class,
    });
    console.log(res.data);
    navigate("/students"); // or redirect wherever you want
  } catch (err) {
    console.error("Error creating student:", err);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Create Student
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Age</label>
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
              type="number"
              placeholder="Enter age"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Class</label>
            <input
              name="class"
              value={formData.class}
              onChange={handleChange}
              type="text"
              placeholder="Enter class (e.g., 10th)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
          >
            Create Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentsCreate;
