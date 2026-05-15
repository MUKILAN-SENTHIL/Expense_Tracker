import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] w-full h-full flex flex-col justify-center mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h3>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Please enter your details to log in.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-xs font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-2"
          >
            Login
          </button>

          <p className="text-[13px] text-slate-600 text-center mt-4">
            Don't have an account?{" "}
            <Link
              className="font-semibold text-purple-600 hover:text-purple-700 underline"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
