import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminProducts } from "../../../redux/slice/adminProductSlice";
import { fetchAllOrders } from "../../../redux/slice/adminOrderSlice";
import CustomTable from "../../components/common/CustomTable";
import Loading from "../../components/common/Loading";
import { FaBox, FaShoppingBag, FaRupeeSign, FaEye } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading: productLoading } = useSelector(
    (state) => state.adminProducts,
  );
  const {
    orders = [],
    totalOrders,
    totalSales,
    page,
    totalPages,
    loading: ordersLoading,
  } = useSelector((state) => state.adminOrders);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders({ page: currentPage, limit: rowsPerPage }));
  }, [dispatch, navigate, currentPage, rowsPerPage]);

  const orderColumns = [
    {
      title: "Order ID",
      key: "_id",
      render: (row) => (
        <span className="font-mono text-sm">#{row._id.slice(-8)}</span>
      ),
    },
    {
      title: "User",
      key: "users.name",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-amber-700">
              {row.user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <span className="text-sm">{row.user?.name || "N/A"}</span>
        </div>
      ),
    },
    {
      title: "Total",
      key: "totalPrice",
      render: (row) => (
        <span className="font-semibold text-gray-900">₹{row.totalPrice}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (row) => {
        const statusColors = {
          Pending: "bg-yellow-100 text-yellow-700",
          Processing: "bg-blue-100 text-blue-700",
          Shipped: "bg-purple-100 text-purple-700",
          Delivered: "bg-green-100 text-green-700",
          Cancelled: "bg-red-100 text-red-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[row.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (row) => (
        <button
          onClick={() => navigate(`/admin/orders/${row._id}`)}
          className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          <FaEye className="text-sm" />
        </button>
      ),
    },
  ];

  if (productLoading || ordersLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
          <MdDashboard className="text-xl text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Revenue Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaRupeeSign className="text-xl text-green-600" />
            </div>
            <span className="text-xs text-gray-500">This month</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{totalSales.toFixed(2)}
          </p>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaShoppingBag className="text-xl text-blue-600" />
            </div>
            <Link
              to="/admin/orders"
              className="text-xs text-amber-600 hover:text-amber-700 font-medium"
            >
              View all →
            </Link>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaBox className="text-xl text-purple-600" />
            </div>
            <Link
              to="/admin/products"
              className="text-xs text-amber-600 hover:text-amber-700 font-medium"
            >
              Manage →
            </Link>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="p-6">
          <CustomTable
            columns={orderColumns}
            data={orders.slice(0, 5)}
            loading={ordersLoading}
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

export default AdminHomePage;
