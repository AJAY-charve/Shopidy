import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Error from "../../../components/common/Error";
import TruncatedTextWithTooltip from "../../../components/common/TruncatedTextWithTooltip";

const ProductGrid = ({ products = [], loading, error }) => {
  if (loading) return <Loading />;
  if (error) return <Error />;

  if (!products.length) {
    return (
      <p className="text-center mt-10 text-gray-500 text-sm">
        No products found
      </p>
    );
  }

  return (
    <div className="px-3 sm:px-4 lg:px-6">
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-4
          2xl:grid-cols-5
          gap-3 sm:gap-4 lg:gap-6
        "
      >
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group"
          >
            {/* CARD */}
            <div
              className="
                bg-white rounded-xl
                border border-gray-100
                transition hover:shadow-md
                flex flex-col h-full
                relative
              "
            >
              {/* IMAGE (overflow only here) */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-xl">
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                />
              </div>

              {/* CONTENT */}
              <div className="p-3 sm:p-4 flex flex-col gap-1 flex-1">
                {/* NAME + TOOLTIP */}
                {/* <div className="relative group">
                  <h3
                    className="
                      text-xs sm:text-sm font-medium
                      truncate cursor-pointer
                      text-gray-800
                    "
                  >
                    {product.name}
                  </h3>

                  <div
                    className="
                      hidden sm:block
                      absolute left-1/2 -translate-x-1/2
                      top-full mt-2
                      min-w-[180px] max-w-[260px]
                      bg-gray-900 text-white text-xs
                      px-3 py-2 rounded-md
                      shadow-xl
                      opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-200
                      z-50
                      whitespace-normal
                      pointer-events-none
                    "
                  >
                    {product.name}

                    
                    <span
                      className="
                        absolute left-1/2 -top-1
                        -translate-x-1/2
                        w-2 h-2
                        bg-gray-900
                        rotate-45
                      "
                    />
                  </div>
                </div> */}

                <TruncatedTextWithTooltip text={product.name} />

                {/* PRICE */}
                <p className="text-sm sm:text-base font-semibold text-gray-700 mt-auto">
                  ₹{product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
