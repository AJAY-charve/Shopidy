import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/common/CustomTable";
import { fetchUserOrders } from "../../../../redux/slice/orderSlice";
import Error from "../../../components/common/Error";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    orders = [],
    loading,
    error,
    page,
    totalPages,
  } = useSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchUserOrders({ page: currentPage, limit: rowsPerPage }));
  }, [dispatch, currentPage, rowsPerPage]);

  const handleViewOrder = (id) => {
    navigate(`/order/${id}`);
  };

  const columns = [
    {
      title: "Image",
      key: "image",
      render: (row) => (
        <img
          src={row.orderItems?.image}
          alt={row.orderItems?.name}
          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
        />
      ),
    },
    {
      title: "Order ID",
      key: "_id",
      render: (row) => (
        <span className="font-medium text-gray-900">#{row._id}</span>
      ),
    },
    {
      title: "Created",
      key: "createdAt",
      render: (row) => (
        <>
          {new Date(row.createdAt).toLocaleDateString()}{" "}
          {new Date(row.createdAt).toLocaleTimeString()}
        </>
      ),
    },
    {
      title: "Shipping Address",
      key: "shippingAddress",
      render: (row) =>
        row.shippingAddress
          ? `${row.shippingAddress.city}, ${row.shippingAddress.country}`
          : "N/A",
    },
    {
      title: "Items",
      key: "items",
      render: (row) => row.orderItems?.length || 0,
    },
    {
      title: "Price",
      key: "totalPrice",
      render: (row) => `₹${row.totalPrice}`,
    },
    {
      title: "Status",
      key: "isPaid",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium
            ${
              row.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {row.isPaid ? "Paid" : "Pending"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <button
          onClick={() => {
            handleViewOrder(row._id);
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          View
        </button>
      ),
    },
  ];

  if (error) {
    return <Error />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <CustomTable
        columns={columns}
        data={orders}
        loading={loading}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};

export default MyOrders;
