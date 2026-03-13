import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
    confirmDelete({
      title: "Delete User?",
      description: "This user account will be permanently deleted.",
      confirmText: "Delete User",
      onConfirm: () => dispatch(deleteUser(id)).unwrap(),
      successMessage: "🗑️ User deleted successfully",
      errorMessage: "❌ Failed to delete user",
    });
  };

  const columns = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      render: (row) => (
        <select
          value={row.role}
          onChange={(e) => handleRoleChange(row._id, e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <button
          onClick={() => handleDeleteUser(row._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  if (error) {
    return <Error />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(addUser(values));
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full border rounded px-3 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full border rounded px-3 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full border rounded px-3 py-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Role</label>
                <Field
                  as="select"
                  name="role"
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  Add User
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

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
  );
};

export default UserManagement;
