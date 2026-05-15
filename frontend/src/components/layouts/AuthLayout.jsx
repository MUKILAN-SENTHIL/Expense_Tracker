import React from "react";
import { LuTrendingUpDown } from "react-icons/lu";
import CARD_2 from "../../assets/images/card2.png";

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-20">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color || "bg-purple-600"} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-semibold text-gray-900">${value}</span>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen bg-white">
      <div className="w-full md:w-[60vw] px-6 sm:px-12 pt-8 pb-12 flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-purple-600 mb-8">Expense Tracker</h2>
        {children}
      </div>
      
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 opacity-80" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-500 absolute top-[30%] -right-10 opacity-60" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 opacity-80" />

        <div className="grid grid-cols-1 z-20 relative mt-12">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-purple-600"
          />
        </div>

        <img
          src={CARD_2}
          alt="Dashboard Mockup Preview"
          className="w-64 lg:w-[90%] absolute bottom-10 left-8 shadow-2xl rounded-xl z-10"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
