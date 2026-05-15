import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-1">
      <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
      <div className="flex justify-end gap-3 mt-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={onDelete}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
