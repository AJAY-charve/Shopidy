// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import register from "../../assets/register.webp";
// import { useDispatch, useSelector } from "react-redux";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { registerUser } from "../../redux/slice/authSlice";
// import { toast } from "sonner";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   const initialValues = {
//     name: "",
//     email: "",
//     password: "",
//   };

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   });

//   const handleSubmit = async (values) => {
//     const result = await dispatch(registerUser(values));

//     if (result.meta.requestStatus === "fulfilled") {
//       toast.success("Successfully registered 🎉");
//       navigate("/login");
//     }

//     if (result.meta.requestStatus === "rejected") {
//       toast.error("Registration failed");
//     }
//   };

//   return (
//     <div className="flex">
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
//               <div className="flex justify-center mb-6">
//                 <h2 className="text-xl font-medium text-red-500"></h2>
//               </div>
//               <h2 className="text-2xl font-bold text-center mb-6">
//                 Hey there!
//               </h2>
//               <p className="text-center mb-6">
//                 Enter your details to create an account
//               </p>

//               {/* NAME */}
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold mb-2">Name</label>
//                 <Field
//                   type="text"
//                   name="name"
//                   placeholder="Enter your name"
//                   className="w-full p-2 border rounded"
//                 />
//                 <ErrorMessage
//                   name="name"
//                   component="div"
//                   className="text-red-600 text-sm mt-1"
//                 />
//               </div>

//               {/* EMAIL */}
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold mb-2">
//                   Email
//                 </label>
//                 <Field
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   className="w-full p-2 border rounded"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-600 text-sm mt-1"
//                 />
//               </div>

//               {/* PASSWORD */}
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold mb-2">
//                   Password
//                 </label>
//                 <Field
//                   type="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   className="w-full p-2 border rounded"
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-600 text-sm mt-1"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting || loading}
//                 className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
//               >
//                 {loading ? "Loading..." : "Sign Up"}
//               </button>

//               <p className="mt-6 text-center text-sm">
//                 Already have an account?{" "}
//                 <Link to={`/login`} className="text-blue-500">
//                   Login
//                 </Link>
//               </p>
//             </Form>
//           )}
//         </Formik>
//       </div>

//       <div className="hidden md:block w-1/2 bg-gray-800">
//         <div className="h-full flex flex-col justify-center items-center">
//           <img
//             src={register}
//             alt="Register Account"
//             className="h-[750px] w-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import register from "../../assets/register.webp";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../redux/slice/authSlice";
import { toast } from "sonner";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

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
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const result = await dispatch(registerUser(values));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Successfully registered! 🎉 Please login");
      navigate("/login");
    }

    if (result.meta.requestStatus === "rejected") {
      toast.error("Registration failed. Email might already exist.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <MdShoppingBag className="text-xl text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Shopidy</span>
            </Link>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account ✨
            </h2>
            <p className="text-gray-600">Join us and start shopping today</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400" />
                      </div>
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a password"
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                        ) : (
                          <FaEye className="text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />

                    {/* Password Requirements */}
                    {/* <div className="mt-2 text-xs text-gray-500 space-y-1">
                      <p className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        At least 6 characters
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        At least one uppercase letter
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        At least one number
                      </p>
                    </div> */}
                  </div>

                  {/* Terms Agreement */}
                  {/* <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="terms" className="text-xs text-gray-600">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-amber-600 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-amber-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div> */}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <FaArrowRight className="text-sm" />
                      </>
                    )}
                  </button>

                  {/* Login Link */}
                  <p className="text-center text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-amber-600 hover:text-amber-700 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-amber-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-amber-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-amber-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white p-12">
          <img
            src={register}
            alt="Register Account"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="relative z-10 text-center max-w-lg">
            <h2 className="text-4xl font-bold mb-4">Join Shopidy Today!</h2>
            <p className="text-lg text-white/90 mb-8">
              Get access to exclusive deals, personalized recommendations, and
              faster checkout
            </p>
            <div className="flex gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm">Secure</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">Free</p>
                <p className="text-sm">Shipping</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
