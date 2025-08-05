import { useEffect, useState } from "react";
import api from "../api";
import { FaEye, FaEdit } from "react-icons/fa";
import StudentModal from "./StudentModal";


const Students = () => {
  const [students, setStudents] = useState([]);
  const [paginatedStudents, setPaginatedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [data,setdata]=useState()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get(`/students
            `);
        setStudents(res?.data.data);
        setdata(res?.data);
        
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);
console.log(data)
  useEffect(() => {
    const startIndex = (currentPage ) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    // setPaginatedStudents(students.slice(startIndex, endIndex));
  }, [students, currentPage, recordsPerPage]);

  const handleView = (student) => {
    setSelectedStudent(student);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent({ ...student });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setSelectedStudent({
      ...selectedStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await api.put(`/students/${selectedStudent.id}`, selectedStudent);
      setIsModalOpen(false);
      setSelectedStudent(null);
      const res = await api.get("/students");
      setStudents(res?.data?.data);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const totalPages = Math.ceil(students.length / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, students.length);

  return (
    <div className="p-6 pb-[120px] relative">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Class</th>
              <th className="px-6 py-3">Created Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">{student.age}</td>
                  <td className="px-6 py-4">{student.class}</td>
                  <td className="px-6 py-4">{student.created_at?.split("T")[0]}</td>
                  <td className="px-6 py-4 flex gap-4">
                    <button
                      onClick={() => handleView(student)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-between items-center px-6 py-4 shadow-md">
        {/* Records Per Page */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Records per page:</span>
          <select
            className="border px-2 py-1 rounded"
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1 ? "bg-indigo-600 text-white" : ""
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>

        {/* Showing Info */}
        <div className="text-sm">
          Showing {startRecord}-{endRecord} of {students.length} records
        </div>
      </div>

      {/* Modal for View/Edit */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
        isEdit={isEditMode}
        onChange={handleChange}
        onSave={handleSave}
      />
    </div>
  );
};

export default Students;
