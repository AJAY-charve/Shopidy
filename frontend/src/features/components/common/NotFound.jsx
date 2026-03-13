import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-6">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes floatSlow {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .fade-in {
            animation: fadeIn 0.7s ease forwards;
          }

          .float {
            animation: floatSlow 7s ease-in-out infinite;
          }
        `}
      </style>

      <div className="max-w-3xl w-full text-center fade-in">
        {/* 404 */}
        <h1 className="text-[120px] md:text-[160px] font-bold text-white/10 leading-none mb-4">
          404
        </h1>

        {/* SVG */}
        <div className="flex justify-center mb-8">
          <div className="w-40 h-40 float">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="4"
              />
              <path d="M70 90h60v30H70z" fill="white" />
              <path d="M85 70h30v20H85z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          Page not found
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          The page you’re looking for doesn’t exist or may have been moved.
          Please check the URL or return to the homepage.
        </p>

        {/* Action */}
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3 rounded-md bg-white text-black font-medium
            hover:bg-gray-200 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-md border border-gray-600 text-gray-300
            hover:border-gray-400 hover:text-white transition"
          >
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-gray-500">Error code: 404</p>
      </div>
    </div>
  );
};

export default NotFound;
