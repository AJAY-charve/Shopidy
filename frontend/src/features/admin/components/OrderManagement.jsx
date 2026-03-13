import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import CustomTable from "../../components/common/CustomTable";
import {
  fetchAllOrders,
  updateOrderStatus,
  clearStatus,
} from "../../../redux/slice/adminOrderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const {
    orders = [],
    page,
    totalPages,
    loading,
    error,
    successMessage,
  } = useSelector((state) => state.adminOrders);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    } else if (user?.role === "admin") {
      dispatch(fetchAllOrders({ page: currentPage, limit: rowsPerPage }));
    }
  }, [dispatch, user, navigate, currentPage, rowsPerPage]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearStatus());
    }

    if (error) {
      toast.error(error);
      dispatch(clearStatus());
    }
  }, [successMessage, error, dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  const columns = [
    {
      title: "Order ID",
      key: "_id",
      render: (row) => (
        <span className="font-medium text-gray-900">#{row._id}</span>
      ),
    },
    {
      title: "Customer",
      key: "user.name",
      render: (row) => row.user?.name || "N/A",
    },
    {
      title: "Total Price",
      key: "totalPrice",
      render: (row) => `₹${row.totalPrice.toFixed(2)}`,
    },
    {
      title: "Status",
      key: "status",
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          disabled={row.status === "Delivered" || loading}
          className={`border rounded px-2 py-1 text-sm bg-white
        ${row.status === "Delivered" ? "bg-gray-100 cursor-not-allowed" : ""}`}
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <button
          onClick={() => handleStatusChange(row._id, "Delivered")}
          disabled={row.status === "Delivered" || loading}
          className={`px-3 py-1 rounded text-sm text-white
        ${
          row.status === "Delivered"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        >
          Mark Delivered
        </button>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-2 lg:p-4 xl:p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

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

export default OrderManagement;
