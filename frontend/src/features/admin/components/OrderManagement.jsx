import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FaEye,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import { MdPending } from "react-icons/md";
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

  const handleViewOrder = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <MdPending className="text-yellow-500" />;
      case "Shipped":
        return <FaTruck className="text-blue-500" />;
      case "Delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "Cancelled":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      Processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Shipped: "bg-blue-100 text-blue-700 border-blue-200",
      Delivered: "bg-green-100 text-green-700 border-green-200",
      Cancelled: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const columns = [
    {
      title: "Order ID",
      key: "_id",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium text-gray-900">
            #{row._id.slice(-8)}
          </span>
        </div>
      ),
    },
    {
      title: "Customer",
      key: "user.name",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-amber-700">
              {row.user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <span className="text-sm text-gray-700">
            {row.user?.name || "N/A"}
          </span>
        </div>
      ),
    },
    {
      title: "Date",
      key: "createdAt",
      render: (row) => (
        <span className="text-sm text-gray-600">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Total",
      key: "totalPrice",
      render: (row) => (
        <span className="font-semibold text-gray-900">
          ₹{row.totalPrice.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (row) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(row.status)}
          <select
            value={row.status}
            onChange={(e) => handleStatusChange(row._id, e.target.value)}
            disabled={row.status === "Delivered" || loading}
            className={`border rounded-lg px-3 py-1.5 text-sm font-medium ${getStatusBadge(row.status)} focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <div className="flex gap-2">
          {/* <button
            onClick={() => handleViewOrder(row._id)}
            className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            title="View Details"
          >
            <FaEye className="text-sm" />
          </button> */}
          {row.status !== "Delivered" && (
            <button
              onClick={() => handleStatusChange(row._id, "Delivered")}
              disabled={loading}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              title="Mark Delivered"
            >
              <FaCheckCircle className="text-sm" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
            <FaTruck className="text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Order Management
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Processing</p>
            <p className="text-2xl font-bold text-yellow-600">
              {orders.filter((o) => o.status === "Processing").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Shipped</p>
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "Shipped").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Delivered</p>
            <p className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === "Delivered").length}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
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
      </div>
    </div>
  );
};

export default OrderManagement;
