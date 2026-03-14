// import React from "react";

// const Loading = ({ size = "md" }) => {
//   const sizes = {
//     sm: "w-5 h-5 border-2",
//     md: "w-8 h-8 border-3",
//     lg: "w-12 h-12 border-4",
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <style>
//         {`
//           @keyframes spin {
//             to { transform: rotate(360deg); }
//           }
//           .spinner {
//             animation: spin 0.9s linear infinite;
//           }
//         `}
//       </style>

//       <div
//         className={`${sizes[size]} spinner rounded-full
//         border-red-500/30 border-t-red-600 shadow-sm`}
//       />
//     </div>
//   );
// };

// export default Loading;

import React from "react";

const Loading = ({
  size = "md",
  color = "amber",
  text = "",
  fullScreen = false,
  overlay = false,
}) => {
  const sizes = {
    xs: "w-4 h-4 border-2",
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-14 h-14 border-4",
    xl: "w-20 h-20 border-4",
  };

  const colors = {
    amber: "border-amber-500/30 border-t-amber-600",
    blue: "border-blue-500/30 border-t-blue-600",
    green: "border-green-500/30 border-t-green-600",
    red: "border-red-500/30 border-t-red-600",
    purple: "border-purple-500/30 border-t-purple-600",
    white: "border-white/30 border-t-white",
    gray: "border-gray-500/30 border-t-gray-600",
  };

  const textColors = {
    amber: "text-amber-600",
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    purple: "text-purple-600",
    white: "text-white",
    gray: "text-gray-600",
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-3">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .spinner {
            animation: spin 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
          }

          .pulse {
            animation: pulse 1.5s ease-in-out infinite;
          }

          .bounce {
            animation: bounce 1s ease-in-out infinite;
          }
        `}
      </style>

      {/* Spinner */}
      <div className="relative">
        {/* Glow Effect */}
        <div
          className={`absolute inset-0 ${colors[color].split(" ")[1]} blur-md opacity-30 rounded-full`}
        ></div>

        {/* Main Spinner */}
        <div
          className={`
            ${sizes[size]} 
            spinner 
            rounded-full 
            border-2
            ${colors[color]}
            shadow-lg
            relative
            z-10
          `}
        />

        {/* Inner Dot for larger sizes */}
        {size === "lg" || size === "xl" ? (
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 ${colors[color].split(" ")[1].replace("border-t-", "bg-")} rounded-full pulse`}
          ></div>
        ) : null}
      </div>

      {/* Loading Text */}
      {text && (
        <div className={`text-sm font-medium ${textColors[color]} pulse`}>
          {text}
        </div>
      )}

      {/* Animated Dots (Optional) */}
      {size === "lg" && !text && (
        <div className="flex gap-1 mt-2">
          <div
            className={`w-1.5 h-1.5 ${textColors[color]} rounded-full bounce`}
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className={`w-1.5 h-1.5 ${textColors[color]} rounded-full bounce`}
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className={`w-1.5 h-1.5 ${textColors[color]} rounded-full bounce`}
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      )}
    </div>
  );

  // Full Screen Loading
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50">
        {spinnerContent}
      </div>
    );
  }

  // Overlay Loading
  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-40">
        {spinnerContent}
      </div>
    );
  }

  // Default Loading
  return spinnerContent;
};

// Pre-made variants
export const PageLoading = () => (
  <Loading size="lg" text="Loading page..." color="amber" fullScreen />
);

export const ButtonLoading = () => <Loading size="sm" color="amber" />;

export const TableLoading = () => (
  <div className="py-12">
    <Loading size="lg" text="Loading data..." color="blue" />
  </div>
);

export const CardLoading = () => (
  <div className="bg-white rounded-xl p-8 shadow-sm border">
    <Loading size="md" text="Loading content..." color="purple" />
  </div>
);

export default Loading;
