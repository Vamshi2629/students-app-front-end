import React, { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const CreateSubjectModal = ({ onClose, onSubjectCreated }) => {
  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState();

  // ✅ Fetch user ID from localStorage on mount
  debugger
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setUserId(storedUser.id);
    }
  }, []);

  const handleUploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default"); // Replace with your actual preset

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djt4kti0n/raw/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    console.log("Cloudinary upload result:", result);

    if (!result.secure_url || !result.public_id) {
      throw new Error("Cloudinary upload failed.");
    }

    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName || !className || !pdfFile) {
      toast.error("Please fill all fields and upload a PDF file.");
      return;
    }

    try {
      setIsLoading(true);
      const uploadResult = await handleUploadToCloudinary(pdfFile);

      await api.post("/subjects/create", {
        subject_name: subjectName,
        class_name: className,
        pdf_url: uploadResult.secure_url,
        cloudinary_public_id: uploadResult.public_id,
        user_id: userId,
      });

      toast.success("Subject created successfully!");
      onSubjectCreated();
      onClose();
    } catch (error) {
      console.error("Error creating subject:", error);
      toast.error("Failed to create subject.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Subject Name</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Upload PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubjectModal;
