// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PayPalButton from "./PayPalButton";
// import { useDispatch, useSelector } from "react-redux";
// import { createCheckout } from "../../../../redux/slice/checkoutSlice";
// import axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import Loading from "../../../components/common/Loading";
// import Error from "../../../components/common/Error";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { cart, loading, error } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.auth);

//   const [checkoutId, setCheckoutId] = useState(null);

//   useEffect(() => {
//     if (!cart || cart.products.length === 0) {
//       navigate("/");
//     }
//   }, [cart, navigate]);

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     phone: "",
//   };

//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("First name required"),
//     lastName: Yup.string().required("Last name required"),
//     address: Yup.string().required("Address required"),
//     city: Yup.string().required("City required"),
//     postalCode: Yup.string().required("Postal code required"),
//     country: Yup.string().required("Country required"),
//     phone: Yup.string()
//       .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
//       .required("Phone required"),
//   });

//   const handleCreateCheckout = async (values) => {
//     try {
//       const checkout = await dispatch(
//         createCheckout({
//           checkoutItems: cart.products,
//           shippingAddress: values,
//           paymentMethod: "PayPal",
//           totalPrice: cart.totalPrice,
//         }),
//       ).unwrap();

//       setCheckoutId(checkout._id);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handlePaymentSuccess = async (details) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
//         { paymentStatus: "paid", paymentDetails: details },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         },
//       );

//       await axios.post(
//         `${
//           import.meta.env.VITE_BACKEND_URL
//         }/api/checkout/${checkoutId}/finalize`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         },
//       );

//       navigate("/order-confirmation");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (loading) return <Loading />;
//   if (error) return <Error />;

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-2 lg:p-4 xl:p-6 tracking-tighter">
//       {/* LEFT */}
//       <div className="bg-white rounded-lg p-6">
//         <h2 className="text-2xl uppercase mb-6">Checkout</h2>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleCreateCheckout}
//         >
//           {() => (
//             <Form>
//               <h3 className="text-lg mb-4">Contact Details</h3>

//               <div className="mb-4">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={user?.email || ""}
//                   disabled
//                   className="w-full p-2 border rounded bg-gray-100"
//                 />
//               </div>

//               <h3 className="text-lg mb-4">Delivery</h3>

//               <div className="mb-4 grid grid-cols-2 gap-4">
//                 <div>
//                   <label>First Name</label>
//                   <Field
//                     name="firstName"
//                     className="w-full p-2 border rounded"
//                   />
//                   <ErrorMessage
//                     name="firstName"
//                     component="p"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label>Last Name</label>
//                   <Field
//                     name="lastName"
//                     className="w-full p-2 border rounded"
//                   />
//                   <ErrorMessage
//                     name="lastName"
//                     component="p"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label>Address</label>
//                 <Field name="address" className="w-full p-2 border rounded" />
//                 <ErrorMessage
//                   name="address"
//                   component="p"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <div className="mb-4 grid grid-cols-2 gap-4">
//                 <div>
//                   <label>City</label>
//                   <Field name="city" className="w-full p-2 border rounded" />
//                   <ErrorMessage
//                     name="city"
//                     component="p"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label>Postal Code</label>
//                   <Field
//                     name="postalCode"
//                     className="w-full p-2 border rounded"
//                   />
//                   <ErrorMessage
//                     name="postalCode"
//                     component="p"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label>Country</label>
//                 <Field name="country" className="w-full p-2 border rounded" />
//                 <ErrorMessage
//                   name="country"
//                   component="p"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label>Phone No</label>
//                 <Field name="phone" className="w-full p-2 border rounded" />
//                 <ErrorMessage
//                   name="phone"
//                   component="p"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               {!checkoutId ? (
//                 <button
//                   type="submit"
//                   className="w-full bg-black text-white py-3 rounded"
//                 >
//                   Continue to Payment
//                 </button>
//               ) : (
//                 <div>
//                   <h3 className="text-lg mb-4">Pay with Paypal</h3>
//                   <PayPalButton
//                     amount={cart.totalPrice.toFixed(2)}
//                     onSuccess={handlePaymentSuccess}
//                     onError={() => alert("Payment failed")}
//                   />
//                 </div>
//               )}
//             </Form>
//           )}
//         </Formik>
//       </div>

//       {/* RIGHT */}
//       <div className="bg-gray-50 p-6 rounded-lg">
//         <h3 className="text-lg mb-4">Order Summary</h3>

//         {cart.products.map((product, index) => (
//           <div key={index} className="flex justify-between border-b py-4">
//             <div>
//               <h3>{product.name}</h3>
//               <p className="text-gray-500">
//                 Size: {product.size} | Color: {product.colors}
//               </p>
//             </div>
//             <p>${product.price}</p>
//           </div>
//         ))}

//         <div className="flex justify-between mt-4 font-semibold">
//           <span>Total</span>
//           <span>${cart.totalPrice}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../../../redux/slice/checkoutSlice";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loading from "../../../components/common/Loading";
import Error from "../../../components/common/Error";
import { FaLock, FaTruck, FaShieldAlt, FaCreditCard } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [activeStep, setActiveStep] = useState(1); // 1: Shipping, 2: Payment

  useEffect(() => {
    if (!cart || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    saveInfo: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .matches(/^[0-9]{5,6}$/, "Invalid postal code"),
    country: Yup.string().required("Country is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
  });

  const handleCreateCheckout = async (values) => {
    try {
      const checkout = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress: values,
          paymentMethod: "PayPal",
          totalPrice: cart.totalPrice,
        }),
      ).unwrap();

      setCheckoutId(checkout._id);
      setActiveStep(2);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      navigate("/order-confirmation", {
        state: { orderId: checkoutId },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const calculateSubtotal = () => {
    return cart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 10;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax example
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely</p>
        </div>

        {/* Checkout Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeStep >= 1
                  ? "bg-amber-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <span
              className={`ml-2 font-medium ${activeStep >= 1 ? "text-gray-900" : "text-gray-500"}`}
            >
              Shipping
            </span>
          </div>
          <div
            className={`w-16 h-0.5 mx-4 ${
              activeStep >= 2 ? "bg-amber-500" : "bg-gray-300"
            }`}
          />
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeStep >= 2
                  ? "bg-amber-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <span
              className={`ml-2 font-medium ${activeStep >= 2 ? "text-gray-900" : "text-gray-500"}`}
            >
              Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Shipping Form */}
              <div className="p-6 border-b">
                <div className="flex items-center gap-2 mb-6">
                  <FaTruck className="text-amber-500 text-xl" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shipping Information
                  </h2>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleCreateCheckout}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <div className="space-y-6">
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <Field
                            name="email"
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="your@email.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="p"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First Name
                            </label>
                            <Field
                              name="firstName"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                              placeholder="John"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name
                            </label>
                            <Field
                              name="lastName"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                              placeholder="Doe"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address
                          </label>
                          <Field
                            name="address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="123 Main St"
                          />
                          <ErrorMessage
                            name="address"
                            component="p"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>

                        {/* Apartment (Optional) */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Apartment, Suite, etc. (Optional)
                          </label>
                          <Field
                            name="apartment"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="Apt 4B"
                          />
                        </div>

                        {/* City, State, Postal Code */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              City
                            </label>
                            <Field
                              name="city"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                              placeholder="New York"
                            />
                            <ErrorMessage
                              name="city"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              State
                            </label>
                            <Field
                              name="state"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                              placeholder="NY"
                            />
                            <ErrorMessage
                              name="state"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Postal Code
                            </label>
                            <Field
                              name="postalCode"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                              placeholder="10001"
                            />
                            <ErrorMessage
                              name="postalCode"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                        </div>

                        {/* Country and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Country
                            </label>
                            <Field
                              as="select"
                              name="country"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            >
                              <option value="">Select Country</option>
                              <option value="US">United States</option>
                              <option value="UK">United Kingdom</option>
                              <option value="CA">Canada</option>
                              <option value="AU">Australia</option>
                            </Field>
                            <ErrorMessage
                              name="country"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <Field
                              name="phone"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                              placeholder="1234567890"
                            />
                            <ErrorMessage
                              name="phone"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                        </div>

                        {/* Save Info Checkbox */}
                        <div className="flex items-center">
                          <Field
                            type="checkbox"
                            name="saveInfo"
                            className="h-4 w-4 text-amber-500  focus:ring-amber-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-600">
                            Save this information for next time
                          </label>
                        </div>

                        {/* Continue Button */}
                        {!checkoutId ? (
                          <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                          >
                            Continue to Payment
                            <BsBagCheck className="text-xl" />
                          </button>
                        ) : null}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>

              {/* Payment Section */}
              {checkoutId && (
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <FaCreditCard className="text-amber-500 text-xl" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Payment Method
                    </h2>
                  </div>

                  <div className="border rounded-lg p-6 bg-gray-50">
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="radio"
                        checked={true}
                        readOnly
                        className="h-4 w-4 text-amber-500"
                      />
                      <span className="font-medium">PayPal</span>
                      <img
                        src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                        alt="PayPal"
                        className="h-6"
                      />
                    </div>

                    <PayPalButton
                      amount={calculateTotal().toFixed(2)}
                      onSuccess={handlePaymentSuccess}
                      onError={() => alert("Payment failed. Please try again.")}
                    />

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <FaShieldAlt className="text-green-500" />
                      <span>
                        Your payment information is secure and encrypted
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              {/* Products List */}
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {cart.products.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {item.size} | Color: {item.color} | Qty:{" "}
                        {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {calculateShipping() === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${calculateShipping().toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium text-gray-900">
                    ${calculateTax().toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-amber-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <FaLock className="text-lg" />
                  <span className="text-xs">Secure SSL Encryption</span>
                  <IoMdCheckmarkCircleOutline className="text-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
