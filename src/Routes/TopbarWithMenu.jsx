import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaUserGraduate, FaSignOutAlt, FaBars } from "react-icons/fa";

const TopbarWithMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const menuItems = [
    { path: "/home", label: "Home", icon: <FaHome /> },
    { path: "/students-create", label: "Students Create", icon: <FaUserGraduate /> },
    { path: "/students", label: "Students", icon: <FaUser /> },
     { path: "/subjects", label: "Subjects", icon: <FaUser size={20} /> },
    { path: "/book/:id", label: "book", icon: <FaUser size={20} /> },
  ];

  return (
    <div className="md:hidden w-full bg-indigo-700 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="text-xl font-bold">My App</div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded hover:bg-indigo-600"
        >
          <FaBars size={20} />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            <hr className="my-1" />

            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopbarWithMenu;
