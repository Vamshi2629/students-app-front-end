// components/StudentModal.jsx
import React from "react";

const StudentModal = ({ isOpen, onClose, student, isEdit, onChange, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Student" : "Student Details"}
        </h2>

        <div className="space-y-4">
          {["name", "email", "age", "class"].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize">{field}</label>
              {isEdit ? (
                <input
                  type={field === "age" ? "number" : "text"}
                  name={field}
                  value={student[field]}
                  onChange={onChange}
                  className="border p-2 w-full rounded"
                />
              ) : (
                <p className="p-2 border rounded bg-gray-50">{student[field]}</p>
              )}
            </div>
          ))}
        </div>

        {isEdit && (
          <button
            onClick={onSave}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentModal;
