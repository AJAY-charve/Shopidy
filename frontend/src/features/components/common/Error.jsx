import React from "react";
import { Link } from "react-router-dom";

const Error = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again later.",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-6">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .float {
            animation: float 6s ease-in-out infinite;
          }

          .fade-in {
            animation: fadeIn 0.8s ease forwards;
          }
        `}
      </style>

      <div className="max-w-2xl w-full text-center fade-in">
        {/* SVG */}
        <div className="flex justify-center mb-10">
          <div className="w-44 h-44 float">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="4"
              />
              <line
                x1="100"
                y1="55"
                x2="100"
                y2="110"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx="100" cy="140" r="6" fill="white" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          {title}
        </h1>

        <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto">
          {message}
        </p>

        {/* Action */}
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3 rounded-md bg-white text-black font-medium
            hover:bg-gray-200 transition"
          >
            Go to Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-md border border-gray-600 text-gray-300
            hover:border-gray-400 hover:text-white transition"
          >
            Retry
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-sm text-gray-500">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};

export default Error;
