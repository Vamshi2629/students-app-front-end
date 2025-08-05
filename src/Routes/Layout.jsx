import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopbarWithMenu from "./TopbarWithMenu";

const Layout = () => {
  const location = useLocation();
  const hideSidebar = ["/", "/signup"].includes(location.pathname);

  return (
    <div className="flex h-screen">
      {/* Sidebar for md and up */}
      {!hideSidebar && <Sidebar />}

      <div className="flex-1 overflow-y-auto">
        {/* Topbar for small screens only */}
        {!hideSidebar && <TopbarWithMenu />}
        
        {/* Padding top for fixed topbar */}
        <div className="pt-16 md:pt-0 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
