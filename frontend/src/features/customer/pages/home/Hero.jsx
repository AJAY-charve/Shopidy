import heroImg from "../../../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Vacation Ready Collection"
          className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-7000"
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
        <div className="max-w-4xl text-center text-white animate-fade-in-up">
          {/* Badge */}
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm tracking-wider mb-6 border border-white/30">
            ✦ NEW SEASON 2024 ✦
          </span>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-6">
            Vacation
            <span className="block text-amber-300">Ready</span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore our vacation-ready outfits with fast worldwide shipping.
            Premium quality fabrics for your dream escape.
          </p>

          {/* CTA Button */}
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Shop Now
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
