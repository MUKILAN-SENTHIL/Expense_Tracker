import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
  if (!imageFile) throw new Error("No image file provided");

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.AUTH.UPLOAD_IMAGE,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error.response?.data || error.message);
    throw error;
  }
};

export default uploadImage;
