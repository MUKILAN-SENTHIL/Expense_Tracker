import React from "react";

const Modal = ({ children, isOpen, onclose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              type="button"
              className="text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-lg w-8 h-8 inline-flex justify-center items-center transition-colors cursor-pointer"
              onClick={onclose}
              aria-label="Close modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          {/* Body */}
          <div className="p-6 overflow-y-auto max-h-[70vh]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
