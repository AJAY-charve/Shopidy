import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Error from "../../../components/common/Error";
import TruncatedTextWithTooltip from "../../../components/common/TruncatedTextWithTooltip";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

const ProductGrid = ({ products = [], loading, error }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  if (loading) return <Loading />;
  if (error) return <Error />;

  if (!products.length) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="group relative"
            onMouseEnter={() => setHoveredProduct(product._id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredProduct === product._id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-md"
                  >
                    <FaEye />
                  </Link>
                  {/* <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg">
                    <FaHeart />
                  </button> */}
                </div>

                {/* Badges */}
                {product.orignalPrice && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    SALE
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Product Name */}
                <TruncatedTextWithTooltip text={product.name} />

                {/* Price */}
                <div className="mt-2 flex items-baseline gap-2">
                  {product.orignalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.orignalPrice}
                    </span>
                  )}
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                </div>

                {/* Rating (optional) */}
                {product.rating && (
                  <div className="mt-2 flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating
                              ? "text-amber-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviews || 0})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
