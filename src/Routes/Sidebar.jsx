import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const menuItems = [
    { path: "/home", label: "Home", icon: <FaHome size={20} /> },
    { path: "/students-create", label: "Students Create", icon: <FaUserGraduate size={20} /> },
    { path: "/students", label: "Students", icon: <FaUser size={20} /> },
    { path: "/subjects", label: "Subjects", icon: <FaUser size={20} /> },
    { path: "/book/:id", label: "book", icon: <FaUser size={20} /> },
  ];

  return (
    <div className="group hidden md:flex w-20 hover:w-64 transition-all duration-300 bg-indigo-700 text-white h-screen p-4 flex-col justify-between">
      {/* Top Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-4 pl-2 hidden group-hover:block">
          My App
        </h2>

        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center gap-4 p-2 hover:bg-indigo-600 rounded-md transition"
              >
                {item.icon}
                <span className="hidden group-hover:inline">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 mt-4 bg-red-500 hover:bg-red-600 rounded-md transition w-full"
      >
        <FaSignOutAlt size={18} />
        <span className="hidden group-hover:inline">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
