// import React from "react";
// import { Link } from "react-router-dom";

// const Error = ({
//   title = "Something went wrong",
//   message = "An unexpected error occurred. Please try again later.",
// }) => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-6">
//       <style>
//         {`
//           @keyframes float {
//             0% { transform: translateY(0); }
//             50% { transform: translateY(-12px); }
//             100% { transform: translateY(0); }
//           }

//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }

//           .float {
//             animation: float 6s ease-in-out infinite;
//           }

//           .fade-in {
//             animation: fadeIn 0.8s ease forwards;
//           }
//         `}
//       </style>

//       <div className="max-w-2xl w-full text-center fade-in">
//         {/* SVG */}
//         <div className="flex justify-center mb-10">
//           <div className="w-44 h-44 float">
//             <svg viewBox="0 0 200 200" className="w-full h-full">
//               <circle
//                 cx="100"
//                 cy="100"
//                 r="90"
//                 fill="none"
//                 stroke="rgba(255,255,255,0.15)"
//                 strokeWidth="4"
//               />
//               <line
//                 x1="100"
//                 y1="55"
//                 x2="100"
//                 y2="110"
//                 stroke="white"
//                 strokeWidth="10"
//                 strokeLinecap="round"
//               />
//               <circle cx="100" cy="140" r="6" fill="white" />
//             </svg>
//           </div>
//         </div>

//         {/* Text */}
//         <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
//           {title}
//         </h1>

//         <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto">
//           {message}
//         </p>

//         {/* Action */}
//         <div className="flex justify-center gap-4">
//           <Link
//             to="/"
//             className="px-8 py-3 rounded-md bg-white text-black font-medium
//             hover:bg-gray-200 transition"
//           >
//             Go to Home
//           </Link>

//           <button
//             onClick={() => window.location.reload()}
//             className="px-8 py-3 rounded-md border border-gray-600 text-gray-300
//             hover:border-gray-400 hover:text-white transition"
//           >
//             Retry
//           </button>
//         </div>

//         {/* Footer note */}
//         <p className="mt-10 text-sm text-gray-500">
//           If the problem persists, please contact support.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Error;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaHome,
  FaRedo,
  FaHeadset,
} from "react-icons/fa";
import { MdError } from "react-icons/md";

const Error = ({
  title = "Oops! Something went wrong",
  message = "We encountered an unexpected error. Please try again or contact support if the problem persists.",
  errorCode = "500",
  showHomeButton = true,
  showRetryButton = true,
  showContactButton = true,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }

          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .float-animation {
            animation: float 6s ease-in-out infinite;
          }

          .pulse-animation {
            animation: pulse 2s ease-in-out infinite;
          }

          .slide-in {
            animation: slideIn 0.6s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-2xl w-full text-center">
        {/* Error Icon with Animation */}
        <div className="relative mb-8">
          <div className="flex justify-center">
            <div className="relative float-animation">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl"></div>

              {/* Main Icon */}
              <div className="relative w-40 h-40 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                <MdError className="text-7xl text-white" />
              </div>

              {/* Error Code Badge */}
              <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg pulse-animation">
                {errorCode}
              </div>

              {/* Decorative Dots */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 slide-in">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>

          {/* Message */}
          <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {showHomeButton && (
              <Link
                to="/"
                className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaHome className="group-hover:-translate-y-1 transition-transform" />
                Go to Home
              </Link>
            )}

            {showRetryButton && (
              <button
                onClick={() => window.location.reload()}
                className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 text-gray-200 font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                <FaRedo className="group-hover:rotate-180 transition-transform duration-500" />
                Retry
              </button>
            )}

            {showContactButton && (
              <Link
                // to="/contact"
                className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-transparent text-gray-300 font-medium hover:text-white transition-all duration-300 border border-gray-700 hover:border-gray-500"
              >
                <FaHeadset className="group-hover:scale-110 transition-transform" />
                Contact Support
              </Link>
            )}
          </div>

          {/* Additional Help */}
          <div className="pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
              <FaExclamationTriangle className="text-amber-500 text-sm" />
              <span className="text-sm text-gray-400">
                Need immediate help? Call us at{" "}
                <a
                  href="tel:+1234567890"
                  className="text-amber-500 hover:underline"
                >
                  +1 (234) 567-890
                </a>
              </span>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-500 mt-8">
            If the problem persists, please{" "}
            <Link className="text-amber-500 hover:underline">
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
