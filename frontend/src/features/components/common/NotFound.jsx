import { Link } from "react-router-dom";
import {
  FaHome,
  FaArrowLeft,
  FaSearch,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(5deg); }
          }

          @keyframes glow {
            0%, 100% { opacity: 0.5; filter: blur(20px); }
            50% { opacity: 0.8; filter: blur(25px); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          .float-animation {
            animation: float 8s ease-in-out infinite;
          }

          .glow-animation {
            animation: glow 3s ease-in-out infinite;
          }

          .slide-up {
            animation: slideUp 0.8s ease-out forwards;
          }

          .bounce-animation {
            animation: bounce 2s ease-in-out infinite;
          }
        `}
      </style>

      <div className="max-w-4xl w-full text-center">
        {/* Background 404 */}
        <div className="relative mb-8">
          <h1 className="text-[180px] md:text-[250px] font-black text-white/5 select-none">
            404
          </h1>

          {/* Animated Icons */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <div className="relative">
              {/* Main 404 Icon */}
              <div className="flex justify-center">
                <div className="relative float-animation">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-amber-500/30 rounded-full glow-animation"></div>

                  {/* Main Icon */}
                  <div className="relative w-40 h-40 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl">
                    <MdErrorOutline className="text-7xl text-white" />

                    {/* Question Mark Overlay */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg bounce-animation">
                      ?
                    </div>
                  </div>

                  {/* Floating Numbers */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-7xl font-bold text-white/20">
                    404
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating Dots */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-amber-500/30 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${5 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6 slide-up">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            The page you're looking for doesn't exist or may have been moved.
            Please check the URL or try searching for what you need.
          </p>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto my-8">
            {["Men", "Women", "New Arrivals", "Sale"].map((item) => (
              <Link
                key={item}
                to={`/collections/all?search=${item}`}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:border-amber-500 hover:text-amber-500 transition-all text-sm"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 ">
            <Link
              to="/"
              className="group flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaHome className="group-hover:-translate-y-1 transition-transform" />
              Go to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 px-8 py-3 rounded-lg bg-gray-800 text-gray-200 font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>

            <Link
              to="/contact"
              className="group flex items-center gap-2 px-8 py-3 rounded-lg bg-transparent text-gray-300 font-medium hover:text-white transition-all duration-300 border border-gray-700 hover:border-gray-500"
            >
              <FaQuestionCircle className="group-hover:scale-110 transition-transform" />
              Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
