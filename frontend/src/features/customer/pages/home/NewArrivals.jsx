import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`,
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollWidth > container.scrollLeft + container.clientWidth,
      );
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0 bg-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">New Arrivals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest styles added this week. Fresh pieces to elevate
            your wardrobe.
          </p>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <div className="absolute -top-16 right-0 flex gap-2">
            <button
              onClick={() => scroll("left")}
              className={`p-3 rounded-full transition-all ${
                canScrollLeft
                  ? "bg-gray-900 text-white hover:bg-amber-500"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!canScrollLeft}
            >
              <FaAngleLeft className="text-xl" />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`p-3 rounded-full transition-all ${
                canScrollRight
                  ? "bg-gray-900 text-white hover:bg-amber-500"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!canScrollRight}
            >
              <FaAngleRight className="text-xl" />
            </button>
          </div>

          {/* Products */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`overflow-x-auto flex gap-6 pb-4 hide-scrollbar ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {newArrivals.map((product, index) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="min-w-[280px] sm:min-w-[320px] group"
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  {/* Image */}
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                    draggable="false"
                  />

                  {/* New Badge */}
                  {index < 3 && (
                    <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>

                {/* Product Info */}
                <div className="mt-4 text-center">
                  <h3 className="font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold mt-1">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
