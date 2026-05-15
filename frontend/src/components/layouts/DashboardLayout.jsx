import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Navbar activeMenu={activeMenu} />

      <div className="flex flex-1 relative">
        {/* Sidebar: desktop only, fixed */}
        <div className="hidden lg:block w-64 fixed top-[61px] left-0 bottom-0 bg-white border-r border-gray-200/50 z-20">
          <SideMenu activeMenu={activeMenu} />
        </div>

        {/* Main content */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all ${user ? "lg:ml-64" : ""}`}>
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
