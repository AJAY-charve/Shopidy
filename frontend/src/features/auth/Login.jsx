import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login.webp";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../redux/slice/authSlice";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      toast.success(`Welcome ${user.name}`);
    }
  }, [user]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const res = await dispatch(loginUser(values));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(`Welcome ${res.payload.name}`);
      navigate("/");
    }

    if (res.meta.requestStatus === "rejected") {
      toast.error("Invalid email or password");
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
                Enter your username and password to login
              </p>

              {/* EMAIL */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
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
                {loading ? "Loading..." : "Sign In"}
              </button>

              <p className="mt-6 text-center text-sm">
                Don't have an account?{" "}
                <Link to={`/register`} className="text-blue-500">
                  Register
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={login}
            alt="Login to Account"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
