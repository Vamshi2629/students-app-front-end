import { useEffect, useState } from "react";
// import api from "../api";
import { FaEye, FaPlus } from "react-icons/fa";
import SubjectModal from "./SubjectModal";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get("/subjects");
        setSubjects(res.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);
  // const user = JSON.parse(localStorage.getItem("user"));


  return (
    <div className="p-6 pb-[120px] relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Subjects List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <FaPlus /> Add Subject
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3">Subject Name</th>
              <th className="px-6 py-3">Class</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {subjects.length > 0 ? (
              subjects.map((subj) => (
                <tr key={subj.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{subj.subject_name}</td>
                  <td className="px-6 py-4">{subj.class_name}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/book/${subj.id}`)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FaEye /> View Book
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No subjects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    {isModalOpen && (
  <SubjectModal
    onClose={() => setIsModalOpen(false)}
    onSubjectCreated={() =>
      api.get("/subjects").then((res) => setSubjects(res.data))
    }
  />
)}

    </div>
  );
};

export default Subjects;
