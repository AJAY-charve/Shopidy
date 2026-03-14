import { Link } from "react-router-dom";
import featured from "../../../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-[500px] md:h-[600px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

          {/* Content */}
          <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 max-w-xl text-white">
            <span className="text-amber-400 font-semibold tracking-wider mb-4 block">
              FEATURED COLLECTION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comfort Meets Style
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Discover high-quality, comfortable clothing that effortlessly
              blends fashion and function. Designed for your everyday life.
            </p>
            <Link
              to="/collections/all"
              className="inline-flex items-center bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-amber-500 hover:text-white transition-colors"
            >
              Explore Collection
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
