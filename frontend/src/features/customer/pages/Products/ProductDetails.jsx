import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../../../redux/slice/productSlice";
import { addToCart } from "../../../../redux/slice/cartSlice";
import Loading from "../../../components/common/Loading";
import Error from "../../../components/common/Error";
import { FaShoppingCart, FaHeart, FaShare, FaCheck } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products,
  );

  const { user } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails({ id: productFetchId }));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.colors?.length > 0) {
        setSelectedColor(selectedProduct.colors[0]);
      }

      if (selectedProduct.sizes?.length > 0) {
        setSelectedSize(selectedProduct.sizes[0]);
      }
    }
  }, [selectedProduct]);

  const handleQuantityChange = (type) => {
    if (type === "plus") setQuantity((prev) => prev + 1);
    if (type === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select size and color", { duration: 1000 });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        userId: user?._id,
      }),
    )
      .then(() => {
        toast.success("Product added to cart!", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="bg-gray-50 min-h-screen ">
      {selectedProduct && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-sm breadcrumbs text-gray-500 mb-6">
            <span>Home</span> / <span>Products</span> /{" "}
            <span className="text-gray-900 font-medium">
              {selectedProduct.name}
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section - Left */}
              <div className="lg:w-3/5 p-6 lg:p-8">
                <div className="flex flex-col-reverse lg:flex-row gap-6">
                  {/* Thumbnails - Vertical on desktop, horizontal on mobile */}
                  <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                    {selectedProduct.images?.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setMainImage(image.url)}
                        className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          mainImage === image.url
                            ? "border-amber-500 shadow-md"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.altText || `Thumbnail ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Main Image */}
                  <div className="flex-1">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={mainImage}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Sale Badge */}
                      {selectedProduct.orignalPrice && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          SALE
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info - Right */}
              <div className="lg:w-2/5 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200">
                {/* Brand/Availability */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-amber-600 font-medium">
                    PREMIUM QUALITY
                  </span>
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <FaCheck className="text-xs" /> In Stock
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {selectedProduct.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  {selectedProduct.orignalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ${selectedProduct.orignalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    ${selectedProduct.price}
                  </span>
                  {selectedProduct.orignalPrice && (
                    <span className="text-sm text-green-600 font-medium">
                      Save $
                      {(
                        selectedProduct.orignalPrice - selectedProduct.price
                      ).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Colors */}
                {selectedProduct.colors?.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900">Color</span>
                      <span className="text-sm text-gray-500">
                        {selectedColor}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`group relative`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                              selectedColor === color
                                ? "border-amber-500 scale-110"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            style={{
                              backgroundColor: color.toLowerCase(),
                              boxShadow:
                                selectedColor === color
                                  ? "0 4px 6px -1px rgba(0,0,0,0.1)"
                                  : "none",
                            }}
                          />
                          {selectedColor === color && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {selectedProduct.sizes?.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900">Size</span>
                      <button className="text-sm text-amber-600 hover:underline">
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[48px] px-4 py-2 rounded-lg border font-medium transition-all ${
                            selectedSize === size
                              ? "border-amber-500 bg-amber-50 text-amber-700"
                              : "border-gray-300 text-gray-700 hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-8">
                  <span className="font-medium text-gray-900 block mb-3">
                    Quantity
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange("minus")}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <FiMinus
                          className={quantity <= 1 ? "text-gray-300" : ""}
                        />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange("plus")}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {selectedProduct.stock} available
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  {/* <button
                    onClick={handleAddToCart}
                    disabled={!user || isButtonDisabled}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-medium transition-all ${
                      !user || isButtonDisabled
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <FaShoppingCart />
                    {!user
                      ? "Login to Add"
                      : isButtonDisabled
                        ? "Adding..."
                        : "Add to Cart"}
                  </button> */}

                  {!user ? (
                    <Link
                      to="/login"
                      className="flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-medium transition-all bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-xl"
                    >
                      <FaShoppingCart />
                      Login to Add
                    </Link>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={isButtonDisabled}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-medium transition-all ${
                        isButtonDisabled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      <FaShoppingCart />
                      {isButtonDisabled ? "Adding..." : "Add to Cart"}
                    </button>
                  )}

                  {/* <button
                    onClick={() => setIsWishlist(!isWishlist)}
                    className={`p-4 rounded-lg border transition-all ${
                      isWishlist
                        ? "border-red-500 text-red-500 bg-red-50"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <FaHeart />
                  </button> */}

                  {/* <button className="p-4 rounded-lg border border-gray-300 text-gray-700 hover:border-gray-400 transition-all">
                    <FaShare />
                  </button> */}
                </div>

                {/* Additional Info */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">SKU:</span>
                      <span className="ml-2 text-gray-900 font-medium">
                        {selectedProduct._id.slice(-8)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 text-gray-900 font-medium">
                        {selectedProduct.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Material:</span>
                      <span className="ml-2 text-gray-900 font-medium">
                        Premium
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Delivery:</span>
                      <span className="ml-2 text-gray-900 font-medium">
                        3-5 Days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* You May Also Like */}
          {similarProducts?.length > 0 && (
            <div className="mt-12 pb-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  You May Also Like
                </h2>
                <p className="text-gray-600">
                  Discover more styles you might love
                </p>
              </div>
              <ProductGrid products={similarProducts} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
