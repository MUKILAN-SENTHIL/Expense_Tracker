import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu, closeMobileMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (closeMobileMenu) closeMobileMenu();
    console.log(user);

    // logout case
    if (route === "/logout") {
      clearUser();

      // also clear token (important fix)
      localStorage.removeItem("token");

      navigate("/login");
      return;
    }

    navigate(route);
  };

  return (
    <div className="w-full h-full bg-white border-r border-gray-200/50 p-5 flex flex-col">
      {/* User profile */}
      <div className="flex flex-col items-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-100"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName || "Guest"}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-900 font-medium leading-6 text-center">
          {user?.fullName || "Guest"}
        </h5>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {SIDE_MENU_DATA?.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`w-full flex items-center gap-4 text-[15px] font-medium py-3 px-6 rounded-lg transition-all ${
              activeMenu === item.label
                ? "text-white bg-purple-600 shadow-md shadow-purple-600/15"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            }`}
            onClick={() => handleClick(item.path)}
          >
            {item.icon && <item.icon className="text-xl flex-shrink-0" />}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
export default SideMenu;
