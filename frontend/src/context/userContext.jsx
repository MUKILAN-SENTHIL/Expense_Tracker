import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔥 AUTO LOAD USER ON APP START
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/auth/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.log("Failed to load user:", err);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
