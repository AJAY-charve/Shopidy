import React, { useEffect, useState } from "react";
import Hero from "../../Layout/Hero";
// import GenderCollection from "../../Products/GenderCollection";
// import NewArrivals from "../../Products/NewArrivals";
import ProductDetails from "../Products/ProductDetails";
import ProductGrid from "../Products/ProductGrid";
import FeaturedCollection from "./FeaturedCollection";
import FeaturesSection from "./FeaturesSection";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../../../../redux/slice/productSlice";

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
        // console.log("Best Seller API data:", response.data);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  // console.log("bestSeller", bestSellerProduct);

  return (
    <div>
      <Hero />
      {/* <GenderCollection />
      <NewArrivals /> */}

      {/* Best Saller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller products</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
