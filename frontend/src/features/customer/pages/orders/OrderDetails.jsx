import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CustomTable from "../../../components/common/CustomTable";
import { fetchOrderDetails } from "../../../../redux/slice/orderSlice";
import Loading from "../../../components/common/Loading";
import Error from "../../../components/common/Error";

const statusStyles = {
  Processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
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
      <div className="flex justify-center items-center py-24 text-gray-500">
        No Order Details Found
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
            className="w-12 h-12 rounded-lg border object-cover"
          />
          <Link
            to={`/product/${row.productId}`}
            className="font-medium text-gray-800 hover:text-blue-600"
          >
            {row.name}
          </Link>
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (row) => `₹${row.price}`,
    },
    {
      title: "Qty",
      key: "quantity",
    },
    {
      title: "Total",
      key: "total",
      render: (row) => `₹${row.price * row.quantity}`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-2 lg:p-4 xl:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        📦 Order Details
      </h2>

      <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <h3 className="text-lg font-semibold text-gray-800 break-all">
              {orderDetails._id}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Placed on {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-start lg:items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border
                ${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }`}
            >
              💰 {orderDetails.isPaid ? "Paid" : "Payment Pending"}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border
                ${
                  orderDetails.isDelivered
                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                    : "bg-orange-100 text-orange-700 border-orange-200"
                }`}
            >
              🚚 {orderDetails.isDelivered ? "Delivered" : "Not Delivered"}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border
                ${
                  statusStyles[orderDetails.status] ||
                  "bg-gray-100 text-gray-700 border-gray-200"
                }`}
            >
              📌 {orderDetails.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Payment Info */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">
              💳 Payment Info
            </h4>
            <p className="text-sm text-gray-600">
              Method:{" "}
              <span className="font-medium">{orderDetails.paymentMethode}</span>
            </p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-medium">
                {orderDetails.isPaid ? "Paid" : "Unpaid"}
              </span>
            </p>
          </div>

          {/* Shipping Info */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">
              🚚 Shipping Info
            </h4>
            <p className="text-sm text-gray-600">
              Method:{" "}
              <span className="font-medium">
                {orderDetails.shippingMethode}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.country}
            </p>
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">
              📊 Order Summary
            </h4>
            <p className="text-sm text-gray-600">
              Items: {orderDetails.orderItems.length}
            </p>
            <p className="text-xl font-bold text-gray-800 mt-1">
              ₹{orderDetails.totalPrice}
            </p>
          </div>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          🛒 Ordered Products
        </h4>

        <CustomTable
          columns={productColumns}
          data={orderDetails.orderItems}
          loading={false}
        />

        <div className="mt-6">
          <Link
            to="/my-orders"
            className="inline-block text-blue-600 hover:underline font-medium"
          >
            ← Back to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
