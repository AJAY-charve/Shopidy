import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser, FaTrash, FaUserPlus, FaShieldAlt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import CustomTable from "../../components/common/CustomTable";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../../redux/slice/adminSlice";
import Error from "../../components/common/Error";
import confirmDelete from "../../components/common/ConfirmDelete";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const {
    users = [],
    loading,
    error,
    page,
    totalPages,
  } = useSelector((state) => state.admin);

  const [currentPage, setCurrentpage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchUsers({ page: currentPage, limit: rowsPerPage }));
    }
  }, [dispatch, user, currentPage, rowsPerPage]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "customer",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["customer", "admin"], "Invalid role")
      .required("Role is required"),
  });

  const handleRoleChange = (id, role) => {
    dispatch(updateUser({ id, role }));
  };

  const handleDeleteUser = (id) => {
    if (id === user._id) {
      alert("You cannot delete your own account");
      return;
    }
    confirmDelete({
      title: "Delete User?",
      description: "This user account will be permanently deleted.",
      confirmText: "Delete User",
      onConfirm: () => dispatch(deleteUser(id)).unwrap(),
      successMessage: "User deleted successfully",
      errorMessage: "Failed to delete user",
    });
  };

  const getRoleBadge = (role) => {
    return role === "admin"
      ? "bg-purple-100 text-purple-700 border-purple-200"
      : "bg-blue-100 text-blue-700 border-blue-200";
  };

  const columns = [
    {
      title: "User",
      key: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-amber-700">
              {row.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      key: "role",
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.role === "admin" ? (
            <MdAdminPanelSettings className="text-purple-500" />
          ) : (
            <FaUser className="text-blue-500" />
          )}
          <select
            value={row.role}
            onChange={(e) => handleRoleChange(row._id, e.target.value)}
            disabled={row._id === user._id}
            className={`border rounded-lg px-3 py-1.5 text-sm font-medium ${getRoleBadge(row.role)} focus:ring-2 focus:ring-amber-500 focus:border-transparent ${row._id === user._id ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ),
    },
    {
      title: "Joined",
      key: "createdAt",
      render: (row) => (
        <span className="text-sm text-gray-600">
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <button
          onClick={() => handleDeleteUser(row._id)}
          disabled={row._id === user._id}
          className={`p-2 rounded-lg transition-colors ${
            row._id === user._id
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
          title={
            row._id === user._id
              ? "Cannot delete your own account"
              : "Delete User"
          }
        >
          <FaTrash className="text-sm" />
        </button>
      ),
    },
  ];

  if (error) {
    return <Error />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              User Management
            </h1>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            <FaUserPlus />
            Add New User
          </button>
        </div>

        {/* Add User Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Add New User
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                dispatch(addUser(values)).then(() => {
                  resetForm();
                  setShowAddForm(false);
                });
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-amber-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="role"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="md:col-span-2 flex gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      Add User
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <CustomTable
            columns={columns}
            data={users}
            loading={loading}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setCurrentpage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
