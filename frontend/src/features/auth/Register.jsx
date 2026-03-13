import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import register from "../../assets/register.webp";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../redux/slice/authSlice";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const result = await dispatch(registerUser(values));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Successfully registered 🎉");
      navigate("/login");
    }

    if (result.meta.requestStatus === "rejected") {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
              <div className="flex justify-center mb-6">
                <h2 className="text-xl font-medium text-red-500"></h2>
              </div>
              <h2 className="text-2xl font-bold text-center mb-6">
                Hey there!
              </h2>
              <p className="text-center mb-6">
                Enter your details to create an account
              </p>

              {/* NAME */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>

              <p className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link to={`/login`} className="text-blue-500">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Register Account"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
