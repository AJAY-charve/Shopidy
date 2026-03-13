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

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);

  useEffect(() => {
    if (!cart || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    address: Yup.string().required("Address required"),
    city: Yup.string().required("City required"),
    postalCode: Yup.string().required("Postal code required"),
    country: Yup.string().required("Country required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone required"),
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
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-2 lg:p-4 xl:p-6 tracking-tighter">
      {/* LEFT */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateCheckout}
        >
          {() => (
            <Form>
              <h3 className="text-lg mb-4">Contact Details</h3>

              <div className="mb-4">
                <label>Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>

              <h3 className="text-lg mb-4">Delivery</h3>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label>First Name</label>
                  <Field
                    name="firstName"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label>Last Name</label>
                  <Field
                    name="lastName"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label>Address</label>
                <Field name="address" className="w-full p-2 border rounded" />
                <ErrorMessage
                  name="address"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label>City</label>
                  <Field name="city" className="w-full p-2 border rounded" />
                  <ErrorMessage
                    name="city"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label>Postal Code</label>
                  <Field
                    name="postalCode"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="postalCode"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label>Country</label>
                <Field name="country" className="w-full p-2 border rounded" />
                <ErrorMessage
                  name="country"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label>Phone No</label>
                <Field name="phone" className="w-full p-2 border rounded" />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {!checkoutId ? (
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded"
                >
                  Continue to Payment
                </button>
              ) : (
                <div>
                  <h3 className="text-lg mb-4">Pay with Paypal</h3>
                  <PayPalButton
                    amount={cart.totalPrice.toFixed(2)}
                    onSuccess={handlePaymentSuccess}
                    onError={() => alert("Payment failed")}
                  />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>

      {/* RIGHT */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>

        {cart.products.map((product, index) => (
          <div key={index} className="flex justify-between border-b py-4">
            <div>
              <h3>{product.name}</h3>
              <p className="text-gray-500">
                Size: {product.size} | Color: {product.colors}
              </p>
            </div>
            <p>${product.price}</p>
          </div>
        ))}

        <div className="flex justify-between mt-4 font-semibold">
          <span>Total</span>
          <span>${cart.totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
