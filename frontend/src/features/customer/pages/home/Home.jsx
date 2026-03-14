// import React, { useEffect, useState } from "react";
// import Hero from "./Hero";
// import ProductDetails from "../Products/ProductDetails";
// import ProductGrid from "../Products/ProductGrid";
// import FeaturedCollection from "./FeaturedCollection";
// import FeaturesSection from "./FeaturesSection";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductByFilters } from "../../../../redux/slice/productSlice";
// import GenderCollection from "./GenderCollection";
// import NewArrivals from "./NewArrivals";

// const Home = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);
//   const [bestSellerProduct, setBestSellerProduct] = useState(null);

//   useEffect(() => {
//     dispatch(
//       fetchProductByFilters({
//         gender: "Women",
//         category: "Bottom Wear",
//         limit: 8,
//       }),
//     );

//     const fetchBestSeller = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
//         );
//         setBestSellerProduct(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchBestSeller();
//   }, [dispatch]);

//   return (
//     <div>
//       <Hero />
//       <GenderCollection />
//       <NewArrivals />

//       {/* Best Saller */}
//       <h2 className="text-3xl text-center font-bold my-4 ">Best Seller</h2>
//       {bestSellerProduct ? (
//         <ProductDetails productId={bestSellerProduct._id} />
//       ) : (
//         <p className="text-center">Loading best seller products...</p>
//       )}

//       <div className="container mx-auto">
//         <h2 className="text-3xl text-center font-bold mb-4">
//           Top Wears for Women
//         </h2>
//         <ProductGrid products={products} loading={loading} error={error} />
//       </div>

//       <FeaturedCollection />
//       <FeaturesSection />
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import ProductDetails from "../Products/ProductDetails";
import ProductGrid from "../Products/ProductGrid";
import FeaturedCollection from "./FeaturedCollection";
import FeaturesSection from "./FeaturesSection";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../../../../redux/slice/productSlice";
import GenderCollection from "./GenderCollection";
import NewArrivals from "./NewArrivals";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      }),
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Brand Strip */}
      <div className="bg-gray-900 text-white py-3 text-center text-sm tracking-wider">
        <p>FREE SHIPPING ON ALL ORDERS OVER $100 • USE CODE: FREESHIP</p>
      </div>

      <GenderCollection />
      <NewArrivals />

      {/* Best Seller Section */}
      <section className="py- px-4 lg:px-0 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold tracking-wider text-sm">
              TOP RATED
            </span>
            <h2 className="text-4xl font-bold mt-2">Best Seller</h2>
            <p className="text-gray-600 mt-4">
              Most loved products by our customers
            </p>
          </div>

          {bestSellerProduct ? (
            <ProductDetails productId={bestSellerProduct._id} />
          ) : (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading best seller...</p>
            </div>
          )}
        </div>
      </section>

      {/* Top Wears Section */}
      <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold tracking-wider text-sm">
              TRENDING NOW
            </span>
            <h2 className="text-4xl font-bold mt-2">Top Wears for Women</h2>
            <p className="text-gray-600 mt-4">
              Discover our most popular styles
            </p>
          </div>
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </section>

      <FeaturedCollection />
      <FeaturesSection />

      {/* Newsletter Section - Add this for better engagement */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h3 className="text-3xl font-bold mb-4">Join the Club</h3>
          <p className="text-gray-300 mb-6">
            Subscribe to get special offers, free giveaways, and exclusive
            deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="px-6 py-3 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
