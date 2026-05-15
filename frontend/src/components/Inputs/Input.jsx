import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full mb-4">
      <label className="block text-[13px] text-slate-800 font-medium mb-1">{label}</label>
      <div className="input-box flex items-center border border-slate-200 rounded-lg px-3 py-2 bg-white focus-within:border-purple-500 transition-colors">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <div className="ml-2 flex items-center justify-center">
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-purple-600 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-slate-400 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
