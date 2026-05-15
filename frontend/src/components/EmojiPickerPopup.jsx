import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emojiData) => {
    const selectedVisual = emojiData?.emoji || "💰";
    onSelect(selectedVisual);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
      <div
        className="flex items-center gap-3 px-4 py-2 border border-dashed border-gray-200 rounded-xl hover:bg-purple-50/50 hover:border-purple-200 transition-all cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-600 rounded-lg group-hover:scale-105 transition-transform">
          {icon ? (
            icon.startsWith("http") ? (
              <img src={icon} alt="Selected Tracker Asset Icon" className="w-8 h-8 object-contain" />
            ) : (
              <span>{icon}</span>
            )
          ) : (
            <LuImage />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">{icon ? "Change Icon" : "Pick Icon"}</p>
          <p className="text-xs text-gray-400">Add a visual category cue</p>
        </div>
      </div>

      {isOpen && (
        <div className="relative border border-gray-100 rounded-xl shadow-xl z-30 animate-in fade-in slide-in-from-top-2 duration-200">
          <button 
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 hover:border-red-200 text-gray-400 hover:text-red-500 rounded-full absolute -top-2 -right-2 z-40 shadow-sm transition-colors cursor-pointer" 
            onClick={() => setIsOpen(false)}
          >
            <LuX size={14} />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={handleEmojiSelect}
            previewConfig={{ showPreview: false }}
            height={320}
            width={280}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
