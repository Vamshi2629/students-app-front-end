import { useEffect, useState } from "react";
import { FaEye, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SubjectModal from "./SubjectModal";
import api from "../../api";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate();
   const [userId, setUserId] = useState();
  
    // ✅ Fetch user ID from localStorage on mount
    // debugger
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.id) {
        setUserId(storedUser.id);
      }
    }, []);

  useEffect(() => {
    fetchSubjects();
  }, [userId]);

  const fetchSubjects = async () => {
    try {
      const res = await api.get(`/subjects/user/${userId}`);
      setSubjects(res.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleDeleteClick = (subject) => {
    setSelectedSubject(subject);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/subjects/${selectedSubject.id}`);
      toast.success(`"${selectedSubject.subject_name}" deleted successfully`);
      fetchSubjects();
    } catch (error) {
      console.error("Failed to delete subject:", error);
      toast.error("Failed to delete the subject");
    } finally {
      setShowConfirm(false);
      setSelectedSubject(null);
    }
  };

  return (
    <div className="p-6 pb-[120px]">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Books List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <FaPlus /> Add Book
        </button>
      </div>

      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5  gap-6">
          {subjects.map((subj) => (
            <div
              key={subj.id}
              className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-center mb-4 text-">
                <h2 className="text-lg font-semibold mb-2">{subj.subject_name}</h2> 
                <button
                  onClick={() => navigate(`/book/${subj.id}`)}
                  className="flex items-center gap-1 hover:text-indigo-800 text-green-600"
                  title="View"
                >
                  <FaEye /> View Book
                </button>
              </div>
              {/* <p className="text-gray-600 mb-4">Class: {subj.class_name}</p> */}
              <div className="flex justify-between text-red-600 text-sm">
                {/* <button
                  onClick={() => alert("Edit logic here")}
                  className="flex items-center gap-1 hover:text-yellow-600"
                  title="Edit"
                >
                  <FaEdit /> Edit
                </button> */}
                <button
                  onClick={() => handleDeleteClick(subj)}
                  className="flex items-center gap-1 hover:text-red-600"
                  title="Delete"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No subjects found.</div>
      )}

      {isModalOpen && (
        <SubjectModal
          onClose={() => setIsModalOpen(false)}
          onSubjectCreated={fetchSubjects}
        />
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete{" "}
              <span className="text-red-600 font-bold">
                "{selectedSubject?.subject_name}"
              </span>
              ?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;
