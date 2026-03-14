// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { clearCart } from "../../../../redux/slice/cartSlice";

// const OrderConfirmation = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { checkout } = useSelector((state) => state.checkout);

//   useEffect(() => {
//     if (checkout && checkout._id) {
//       dispatch(clearCart());
//       localStorage.removeItem("cart");
//     } else {
//       navigate("/my-orders");
//     }
//   }, [checkout, dispatch, navigate]);

//   const estimatedDelivery = (createdAt) => {
//     const date = new Date(createdAt);
//     date.setDate(date.getDate() + 10);
//     return date.toLocaleDateString();
//   };

//   if (!checkout) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 sm:p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
//             <span className="text-2xl text-emerald-700">✓</span>
//           </div>
//           <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700">
//             Order Confirmed
//           </h1>
//           <p className="text-gray-500 mt-2">Thank you for your purchase</p>
//         </div>

//         {/* Order Info */}
//         <div className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-5 mb-6">
//           <div>
//             <h2 className="text-lg font-semibold">
//               Order ID: <span className="text-gray-600">{checkout._id}</span>
//             </h2>
//             <p className="text-sm text-gray-500">
//               Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
//             </p>
//           </div>

//           <div className="text-sm font-medium text-emerald-700">
//             Estimated Delivery: {estimatedDelivery(checkout.createdAt)}
//           </div>
//         </div>

//         {/* Items */}
//         <div className="space-y-4 mb-8">
//           {checkout.checkoutItems.map((item) => (
//             <div
//               key={item.productId}
//               className="flex items-center gap-4 border rounded-md p-4"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-16 h-16 rounded object-cover"
//               />

//               <div className="flex-1">
//                 <h4 className="font-semibold">{item.name}</h4>
//                 <p className="text-sm text-gray-500">
//                   {item.color} • {item.size}
//                 </p>
//                 <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//               </div>

//               <div className="font-semibold text-gray-800">₹{item.price}</div>
//             </div>
//           ))}
//         </div>

//         {/* Payment & Delivery */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6">
//           <div>
//             <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
//             <p className="text-gray-600">PayPal</p>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold mb-2">Delivery Address</h4>
//             <p className="text-gray-600">{checkout.shippingAddress.address}</p>
//             <p className="text-gray-600">
//               {checkout.shippingAddress.city},{" "}
//               {checkout.shippingAddress.country}
//             </p>
//           </div>
//         </div>

//         {/* Button */}
//         <div className="mt-8 text-center">
//           <button
//             onClick={() => navigate("/my-orders")}
//             className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { clearCart } from "../../../../redux/slice/cartSlice";
import {
  FaCheckCircle,
  FaTruck,
  FaBox,
  FaCreditCard,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPrint,
  FaShare,
  FaEnvelope,
} from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import Confetti from "react-confetti";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { checkout } = useSelector((state) => state.checkout);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Clear cart on successful order
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");

      // Stop confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    } else {
      // If no checkout data, redirect to orders
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  useEffect(() => {
    // Update window size for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const estimatedDelivery = (createdAt) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 10);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatOrderId = (id) => {
    return id.slice(-8).toUpperCase();
  };

  const calculateTotal = () => {
    return (
      checkout?.checkoutItems?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ) || 0
    );
  };

  const handleTrackOrder = () => {
    navigate(`/order-tracking/${checkout._id}`);
  };

  const handlePrintOrder = () => {
    window.print();
  };

  const handleShareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Order Confirmation",
        text: `Just placed order #${formatOrderId(checkout._id)}`,
        url: window.location.href,
      });
    }
  };

  if (!checkout) return null;

  return (
    <>
      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header with Animation */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="relative inline-block">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center animate-bounce">
                <FaCheckCircle className="text-5xl text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Thank You!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Your order has been confirmed
            </p>
            <p className="text-gray-500">
              We'll send you a shipping confirmation when your order is on its
              way.
            </p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            {/* Order Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-white">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <BsBagCheck className="text-2xl" />
                  <div>
                    <p className="text-sm opacity-90">Order ID</p>
                    <p className="font-mono font-bold">
                      #{formatOrderId(checkout._id)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span className="text-sm">
                      {new Date(checkout.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTruck />
                    <span className="text-sm">Express Shipping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-b px-6 py-3 bg-gray-50 flex flex-wrap gap-2">
              <button
                onClick={handleTrackOrder}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white rounded-lg border hover:border-emerald-500 hover:text-emerald-600 transition-colors"
              >
                <FaTruck />
                Track Order
              </button>
              <button
                onClick={handlePrintOrder}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white rounded-lg border hover:border-emerald-500 hover:text-emerald-600 transition-colors"
              >
                <FaPrint />
                Print
              </button>
              <button
                onClick={handleShareOrder}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white rounded-lg border hover:border-emerald-500 hover:text-emerald-600 transition-colors"
              >
                <FaShare />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white rounded-lg border hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                <IoMdDownload />
                Invoice
              </button>
            </div>

            {/* Delivery Status */}
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Delivery Status</h3>
                <span className="text-sm text-emerald-600 font-medium">
                  Confirmed
                </span>
              </div>
              <div className="relative">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div className="w-1/3 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="font-medium text-emerald-600">
                    Order Placed
                  </span>
                  <span>Processing</span>
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 flex items-center gap-2">
                <FaTruck className="text-emerald-500" />
                Estimated delivery:{" "}
                <span className="font-semibold">
                  {estimatedDelivery(checkout.createdAt)}
                </span>
              </p>
            </div>

            {/* Items */}
            <div className="px-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaBox className="text-emerald-500" />
                Order Items ({checkout.checkoutItems.length})
              </h3>

              <div className="space-y-4">
                {checkout.checkoutItems.map((item, index) => (
                  <div
                    key={item.productId || index}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Color: {item.color} • Size: {item.size} • Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-emerald-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment & Delivery Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaCreditCard className="text-xl text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Payment Method</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 font-medium">PayPal</p>
                <p className="text-sm text-gray-500">
                  Payment Status:{" "}
                  <span className="text-green-600 font-medium">Paid</span>
                </p>
                <p className="text-xs text-gray-400">
                  Transaction ID:{" "}
                  {checkout.paymentDetails?.id ||
                    "PAY-" + formatOrderId(checkout._id)}
                </p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-xl text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  Delivery Address
                </h3>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-800">
                  {checkout.shippingAddress.firstName}{" "}
                  {checkout.shippingAddress.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {checkout.shippingAddress.address}
                </p>
                {checkout.shippingAddress.apartment && (
                  <p className="text-sm text-gray-600">
                    {checkout.shippingAddress.apartment}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  {checkout.shippingAddress.city},{" "}
                  {checkout.shippingAddress.state}{" "}
                  {checkout.shippingAddress.postalCode}
                </p>
                <p className="text-sm text-gray-600">
                  {checkout.shippingAddress.country}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Phone: {checkout.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Confirmation Email Sent
                </h4>
                <p className="text-sm text-gray-600">
                  We've sent a confirmation email to{" "}
                  <span className="font-medium">
                    {checkout.shippingAddress.email}
                  </span>{" "}
                  with all the details of your order.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/my-orders")}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <BsBagCheck />
              View My Orders
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-4 bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Continue Shopping
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need help with your order?{" "}
              <button className="text-emerald-600 hover:underline font-medium">
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
          body {
            background: white;
          }
        }
      `}</style>
    </>
  );
};

export default OrderConfirmation;
