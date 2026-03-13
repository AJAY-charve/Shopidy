import React from "react";

const Loading = ({ size = "md" }) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .spinner {
            animation: spin 0.9s linear infinite;
          }
        `}
      </style>

      <div
        className={`${sizes[size]} spinner rounded-full
        border-red-500/30 border-t-red-600 shadow-sm`}
      />
    </div>
  );
};

export default Loading;
