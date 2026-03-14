import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CustomTable from "../../../components/common/CustomTable";
import { fetchOrderDetails } from "../../../../redux/slice/orderSlice";
import Loading from "../../../components/common/Loading";
import Error from "../../../components/common/Error";
import {
  FaArrowLeft,
  FaBox,
  FaTruck,
  FaCreditCard,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";

const statusStyles = {
  Processing: "bg-amber-100 text-amber-700 border-amber-200",
  Shipped: "bg-blue-100 text-blue-700 border-blue-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
  Delivered: "bg-green-100 text-green-700 border-green-200",
};

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orderDetails, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderDetails({ orderId: id }));
  }, [dispatch, id]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        <div className="text-center">
          <FaBox className="text-5xl text-gray-300 mx-auto mb-4" />
          <p className="text-lg">No Order Details Found</p>
        </div>
      </div>
    );
  }

  const productColumns = [
    {
      title: "Product",
      key: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={row.name}
            className="w-14 h-14 rounded-lg border border-gray-200 object-cover"
          />
          <Link
            to={`/product/${row.productId}`}
            className="font-medium text-gray-800 hover:text-amber-600 transition-colors"
          >
            {row.name}
          </Link>
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (row) => (
        <span className="font-medium text-gray-900">₹{row.price}</span>
      ),
    },
    {
      title: "Qty",
      key: "quantity",
      render: (row) => <span className="text-gray-700">{row.quantity}</span>,
    },
    {
      title: "Total",
      key: "total",
      render: (row) => (
        <span className="font-bold text-gray-900">
          ₹{row.price * row.quantity}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/profile"
            className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <FaArrowLeft className="text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <BsBagCheck className="text-xl text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Order Header with Status */}
          <div className="bg-gradient-to-r from-gray-50 to-white border-b p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <h2 className="text-lg font-mono font-semibold text-gray-900">
                  #{orderDetails._id.slice(-12)}
                </h2>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <FaClock className="text-xs" />
                  Placed on{" "}
                  {new Date(orderDetails.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                {/* Payment Status */}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${
                    orderDetails.isPaid
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-amber-100 text-amber-700 border-amber-200"
                  }`}
                >
                  <FaCreditCard className="text-xs" />
                  {orderDetails.isPaid ? "Paid" : "Pending"}
                </span>

                {/* Delivery Status */}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${
                    orderDetails.isDelivered
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                      : "bg-blue-100 text-blue-700 border-blue-200"
                  }`}
                >
                  <FaTruck className="text-xs" />
                  {orderDetails.isDelivered ? "Delivered" : "Processing"}
                </span>

                {/* Order Status */}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${
                    statusStyles[orderDetails.status] ||
                    "bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  <FaCheckCircle className="text-xs" />
                  {orderDetails.status}
                </span>
              </div>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Payment Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaCreditCard className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Payment</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Method:{" "}
                    <span className="font-medium text-gray-900 capitalize">
                      {orderDetails.paymentMethode || "N/A"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Status:{" "}
                    <span
                      className={`font-medium ${orderDetails.isPaid ? "text-green-600" : "text-amber-600"}`}
                    >
                      {orderDetails.isPaid ? "Paid" : "Pending"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <FaTruck className="text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Shipping</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Method:{" "}
                    <span className="font-medium text-gray-900 capitalize">
                      {orderDetails.shippingMethode || "Standard"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Address:{" "}
                    <span className="font-medium text-gray-900">
                      {orderDetails.shippingAddress?.city},{" "}
                      {orderDetails.shippingAddress?.country}
                    </span>
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaBox className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Summary</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Items:{" "}
                    <span className="font-medium text-gray-900">
                      {orderDetails.orderItems?.length || 0}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Total:{" "}
                    <span className="font-bold text-lg text-gray-900">
                      ₹{orderDetails.totalPrice}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaBox className="text-amber-500" />
                Ordered Products
              </h3>

              <div className="border rounded-lg overflow-hidden">
                <CustomTable
                  columns={productColumns}
                  data={orderDetails.orderItems}
                  loading={false}
                />
              </div>
            </div>

            {/* Back Button */}
            <div className="border-t pt-6">
              <Link
                to="/my-orders"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                <FaArrowLeft className="text-sm" />
                Back to My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
