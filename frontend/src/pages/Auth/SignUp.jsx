import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadimage";

const SignUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email Validation
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("image", file); // MUST MATCH backend

    const response = await axiosInstance.post(
      "/api/v1/auth/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  };
  const handleSignUp = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    let profileImageUrl = "";

    try {
      let profileImageUrl = "";

      // 1. upload first
      if (profilePic) {
        const res = await uploadImage(profilePic);
        profileImageUrl = res.imageUrl;
      }

      // 2. register user
      const response = await axiosInstance.post("/api/v1/auth/register", {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[85%] w-full h-auto md:h-full mt-6 md:mt-0 flex flex-col justify-center mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          Create an Account
        </h3>

        <p className="text-xs text-slate-500 mt-1 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
              required
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
              required
            />

            <div className="sm:col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-medium mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-[13px] text-slate-600 text-center mt-4">
            Already have an account?{" "}
            <Link
              className="font-semibold text-purple-600 hover:text-purple-700 underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
