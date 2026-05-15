import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <header className="flex items-center gap-5 bg-white border-b border-gray-200/50 py-4 px-7 sticky top-0 z-50 shadow-sm">
      <button
        className="block lg:hidden text-gray-700 hover:text-purple-600 transition-colors"
        onClick={() => setOpenSideMenu(!openSideMenu)}
        aria-label="Toggle menu"
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-semibold text-purple-600">Expense Tracker</h2>

      {/* Mobile sidebar drawer */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-64 bg-white shadow-xl h-[calc(100vh-61px)] z-40 lg:hidden">
          <SideMenu
            activeMenu={activeMenu}
            closeMobileMenu={() => setOpenSideMenu(false)}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
