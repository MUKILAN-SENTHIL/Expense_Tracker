import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const fetchAttempted = useRef(false);

  useEffect(() => {
    if (user) return;

    const token = localStorage.getItem("token");
    if (!token) {
      clearUser();
      if (!["/login", "/signup"].includes(location.pathname)) {
        navigate("/login");
      }
      return;
    }

    if (fetchAttempted.current) return;
    fetchAttempted.current = true;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      } finally {
        if (isMounted) fetchAttempted.current = false;
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate, location.pathname]);

  return { user, isAuthenticated: !!user };
};

export default useUserAuth;
