import React, { useRef, useState, useEffect } from "react";
import { LuUpload, LuTrash, LuUser } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-purple-600" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full absolute -bottom-1 -right-1 shadow-md transition-colors cursor-pointer"
            onClick={onChooseFile}
          >
            <LuUpload size={16} />
          </button>
        </div>
      ) : (
        <div className="relative w-20 h-20">
          <img
            src={previewUrl || image}
            alt="profile photo preview"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-200"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 shadow-md transition-colors cursor-pointer"
            onClick={handleRemoveImage}
          >
            <LuTrash size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
