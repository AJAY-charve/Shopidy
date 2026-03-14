// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { fetchProductDetails } from "../../../redux/slice/productSlice";
// import { updateProduct } from "../../../redux/slice/adminProductSlice";
// import { toast } from "sonner";
// import Loading from "../../components/common/Loading";
// import Error from "../../components/common/Error";

// const MAX_IMAGES = 4;

// const categories = ["Top Wear", "Bottom Wear"];
// const genders = ["Men", "Women", "Unisex"];
// const colors = ["red", "blue", "black", "yellow", "white", "pink", "beige"];
// const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
// const materials = ["Cotton", "Denim", "Wool", "Silk"];
// const brands = ["Urban Threads", "Fashionista", "ChicStyle"];

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Product name is required"),
//   description: Yup.string().required("Description is required"),
//   price: Yup.number()
//     .required("Price is required")
//     .min(0, "Price cannot be negative"),
//   countInStock: Yup.number()
//     .required("Stock is required")
//     .min(0, "Stock cannot be negative"),
//   sku: Yup.string().required("SKU is required"),
//   category: Yup.string().required("Category is required"),
//   brand: Yup.string().required("Brand is required"),
//   material: Yup.string().required("Material is required"),
//   gender: Yup.string().required("Gender is required"),
//   sizes: Yup.array().min(1, "Select at least one size"),
//   colors: Yup.array().min(1, "Select at least one color"),
//   images: Yup.array().min(1, "Upload at least one image"),
// });

// const EditProduct = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const { selectedProduct, loading, error } = useSelector(
//     (state) => state.products
//   );

//   const [uploadingCount, setUploadingCount] = useState(0);

//   useEffect(() => {
//     if (id) dispatch(fetchProductDetails({ id }));
//   }, [dispatch, id]);

//   if (loading) return <Loading />;
//   if (error) return <Error />;

//   return (
//     <div className="max-w-5xl mx-auto p-2 lg:p-4 xl:p-6 shadow-md rounded-md">
//       <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

//       {selectedProduct && (
//         <Formik
//           enableReinitialize
//           initialValues={{
//             name: selectedProduct.name || "",
//             description: selectedProduct.description || "",
//             price: selectedProduct.price || "",
//             countInStock: selectedProduct.countInStock || "",
//             sku: selectedProduct.sku || "",
//             category: selectedProduct.category || "",
//             brand: selectedProduct.brand || "",
//             material: selectedProduct.material || "",
//             gender: selectedProduct.gender || "",
//             sizes: selectedProduct.sizes || [],
//             colors: selectedProduct.colors || [],
//             images: selectedProduct.images || [],
//           }}
//           validationSchema={validationSchema}
//           onSubmit={async (values, { setSubmitting }) => {
//             try {
//               await dispatch(
//                 updateProduct({ id, productData: values })
//               ).unwrap();
//               toast.success("✏️ Product updated successfully");
//               navigate("/admin/products");
//             } catch (err) {
//               toast.error("❌ Product update failed");
//             } finally {
//               setSubmitting(false);
//             }
//           }}
//         >
//           {({ values, setFieldValue, isSubmitting }) => {
//             const handleImageUpload = async (files) => {
//               if (!files.length) return;

//               const remaining = MAX_IMAGES - values.images.length;
//               if (remaining <= 0) {
//                 toast.error("❌ Maximum 4 images allowed");
//                 return;
//               }

//               const filesToUpload = Array.from(files).slice(0, remaining);

//               for (let file of filesToUpload) {
//                 const formData = new FormData();
//                 formData.append("image", file);

//                 try {
//                   setUploadingCount((c) => c + 1);
//                   const { data } = await axios.post(
//                     `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
//                     formData,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                   );
//                   setFieldValue("images", [
//                     ...values.images,
//                     { url: data.imageUrl, altText: "" },
//                   ]);
//                 } catch (err) {
//                   toast.error("❌ Image upload failed");
//                 } finally {
//                   setUploadingCount((c) => c - 1);
//                 }
//               }
//             };

//             const handleDeleteImage = (index) => {
//               setFieldValue(
//                 "images",
//                 values.images.filter((_, i) => i !== index)
//               );
//               toast.success("✅ Image deleted");
//             };

//             return (
//               <Form>
//                 {/* NAME */}
//                 <div className="mb-4">
//                   <label className="block font-semibold mb-1">
//                     Product Name
//                   </label>
//                   <Field
//                     name="name"
//                     type="text"
//                     className="w-full border p-2 rounded"
//                   />
//                   <ErrorMessage
//                     name="name"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 {/* DESCRIPTION */}
//                 <div className="mb-4">
//                   <label className="block font-semibold mb-1">
//                     Description
//                   </label>
//                   <Field
//                     name="description"
//                     as="textarea"
//                     rows={4}
//                     className="w-full border p-2 rounded"
//                   />
//                   <ErrorMessage
//                     name="description"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 {/* PRICE */}
//                 <div className="mb-4">
//                   <label className="block font-semibold mb-1">Price</label>
//                   <Field
//                     name="price"
//                     type="number"
//                     className="w-full border p-2 rounded"
//                   />
//                   <ErrorMessage
//                     name="price"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 {/* STOCK */}
//                 <div className="mb-4">
//                   <label className="block font-semibold mb-1">
//                     Count in Stock
//                   </label>
//                   <Field
//                     name="countInStock"
//                     type="number"
//                     className="w-full border p-2 rounded"
//                   />
//                   <ErrorMessage
//                     name="countInStock"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 {/* CATEGORY */}
//                 <div className="mb-4">
//                   <label className="font-semibold">Category</label>
//                   <Field
//                     name="category"
//                     as="select"
//                     className="w-full border p-2 rounded"
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((c) => (
//                       <option key={c} value={c}>
//                         {c}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage
//                     name="category"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 {/* BRAND */}
//                 <div className="mb-4">
//                   <label className="font-semibold">Brand</label>
//                   <Field
//                     name="brand"
//                     as="select"
//                     className="w-full border p-2 rounded"
//                   >
//                     <option value="">Select Brand</option>
//                     {brands.map((b) => (
//                       <option key={b} value={b}>
//                         {b}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage
//                     name="brand"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 {/* MATERIAL */}
//                 <div className="mb-4">
//                   <label className="font-semibold">Material</label>
//                   <Field
//                     name="material"
//                     as="select"
//                     className="w-full border p-2 rounded"
//                   >
//                     <option value="">Select Material</option>
//                     {materials.map((m) => (
//                       <option key={m} value={m}>
//                         {m}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage
//                     name="material"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 {/* GENDER */}
//                 <div className="mb-4">
//                   <label className="font-semibold">Gender</label>
//                   <Field
//                     name="gender"
//                     as="select"
//                     className="w-full border p-2 rounded"
//                   >
//                     <option value="">Select Gender</option>
//                     {genders.map((g) => (
//                       <option key={g} value={g}>
//                         {g}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage
//                     name="gender"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 {/* SIZES */}
//                 <div className="mb-4">
//                   <label className="font-semibold">Sizes</label>
//                   <div className="flex flex-wrap gap-3 mt-2">
//                     {sizes.map((s) => (
//                       <label key={s} className="flex gap-2 items-center">
//                         <input
//                           type="checkbox"
//                           checked={values.sizes.includes(s)}
//                           onChange={(e) => {
//                             if (e.target.checked) {
//                               setFieldValue("sizes", [...values.sizes, s]);
//                             } else {
//                               setFieldValue(
//                                 "sizes",
//                                 values.sizes.filter((x) => x !== s)
//                               );
//                             }
//                           }}
//                         />
//                         {s}
//                       </label>
//                     ))}
//                   </div>
//                   <ErrorMessage
//                     name="sizes"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 {/* COLORS */}
//                 <div className="mb-4">
//                   <label className="font-semibold">Colors</label>
//                   <div className="flex flex-wrap gap-3 mt-2">
//                     {colors.map((c) => (
//                       <label
//                         key={c}
//                         className="flex gap-2 items-center capitalize"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={values.colors.includes(c)}
//                           onChange={(e) => {
//                             if (e.target.checked) {
//                               setFieldValue("colors", [...values.colors, c]);
//                             } else {
//                               setFieldValue(
//                                 "colors",
//                                 values.colors.filter((x) => x !== c)
//                               );
//                             }
//                           }}
//                         />
//                         {c}
//                       </label>
//                     ))}
//                   </div>
//                   <ErrorMessage
//                     name="colors"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 {/* IMAGE UPLOAD */}
//                 <div className="mb-6">
//                   <label className="block font-semibold mb-2">
//                     Upload Images (Max 4)
//                   </label>

//                   <label
//                     className={`inline-block px-4 py-2 rounded-md text-white cursor-pointer transition
//                       ${
//                         values.images.length >= MAX_IMAGES
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-blue-600 hover:bg-blue-700"
//                       }`}
//                   >
//                     Choose Images
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(e.target.files)}
//                       disabled={values.images.length >= MAX_IMAGES}
//                       className="hidden"
//                     />
//                   </label>

//                   {values.images.length >= MAX_IMAGES && (
//                     <p className="text-red-600 text-sm mt-2">
//                       Maximum 4 images reached
//                     </p>
//                   )}

//                   <div className="flex flex-wrap gap-4 mt-4">
//                     {values.images.map((img, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={img.url}
//                           className="w-24 h-24 object-cover rounded-md shadow"
//                           alt=""
//                         />
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteImage(index)}
//                           className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     ))}

//                     {uploadingCount > 0 &&
//                       Array.from({ length: uploadingCount }).map((_, i) => (
//                         <div
//                           key={i}
//                           className="w-24 h-24 rounded-md bg-gray-200 animate-pulse"
//                         />
//                       ))}
//                   </div>
//                   <ErrorMessage
//                     name="images"
//                     component="div"
//                     className="text-red-600 text-sm mt-1"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting || uploadingCount > 0}
//                   className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
//                 >
//                   Update Product
//                 </button>
//               </Form>
//             );
//           }}
//         </Formik>
//       )}
//     </div>
//   );
// };

// export default EditProduct;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { fetchProductDetails } from "../../../redux/slice/productSlice";
import { updateProduct } from "../../../redux/slice/adminProductSlice";
import { toast } from "sonner";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import { FaCloudUploadAlt, FaTrash, FaEdit } from "react-icons/fa";

const MAX_IMAGES = 4;

const categories = ["Top Wear", "Bottom Wear", "Winter Wear", "Summer Wear"];
const genders = ["Men", "Women", "Unisex", "Kids"];
const colors = [
  "Red",
  "Blue",
  "Black",
  "Yellow",
  "White",
  "Pink",
  "Beige",
  "Green",
  "Purple",
  "Orange",
];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const materials = ["Cotton", "Denim", "Wool", "Silk", "Polyester", "Linen"];
const brands = [
  "Urban Threads",
  "Fashionista",
  "ChicStyle",
  "StreetWear",
  "Classic",
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be greater than 0"),
  countInStock: Yup.number()
    .required("Stock is required")
    .min(0, "Stock cannot be negative"),
  sku: Yup.string().required("SKU is required"),
  category: Yup.string().required("Category is required"),
  brand: Yup.string().required("Brand is required"),
  material: Yup.string().required("Material is required"),
  gender: Yup.string().required("Gender is required"),
  sizes: Yup.array().min(1, "Select at least one size"),
  colors: Yup.array().min(1, "Select at least one color"),
  images: Yup.array().min(1, "Upload at least one image"),
});

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );

  const [uploadingCount, setUploadingCount] = useState(0);

  useEffect(() => {
    if (id) dispatch(fetchProductDetails({ id }));
  }, [dispatch, id]);

  const handleImageUpload = async (files, setFieldValue, currentImages) => {
    if (!files.length) return;

    const remaining = MAX_IMAGES - currentImages.length;
    if (remaining <= 0) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remaining);

    for (let file of filesToUpload) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        setUploadingCount((c) => c + 1);
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          formData,
        );

        setFieldValue("images", [
          ...currentImages,
          { url: data.imageUrl, altText: "" },
        ]);
        toast.success("Image uploaded successfully");
      } catch (error) {
        toast.error("Image upload failed");
      } finally {
        setUploadingCount((c) => c - 1);
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
            <FaEdit className="text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Edit Product
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {selectedProduct && (
            <Formik
              enableReinitialize
              initialValues={{
                name: selectedProduct.name || "",
                description: selectedProduct.description || "",
                price: selectedProduct.price || "",
                countInStock: selectedProduct.countInStock || "",
                sku: selectedProduct.sku || "",
                category: selectedProduct.category || "",
                brand: selectedProduct.brand || "",
                material: selectedProduct.material || "",
                gender: selectedProduct.gender || "",
                sizes: selectedProduct.sizes || [],
                colors: selectedProduct.colors || [],
                images: selectedProduct.images || [],
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await dispatch(
                    updateProduct({ id, productData: values }),
                  ).unwrap();
                  toast.success("Product updated successfully");
                  navigate("/admin/products");
                } catch (err) {
                  toast.error("Product update failed");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form className="p-6">
                  {/* Basic Information Section */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                      Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Product Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Name <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="name"
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        />
                        <ErrorMessage
                          name="name"
                          component="p"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      {/* SKU */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SKU <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="sku"
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        />
                        <ErrorMessage
                          name="sku"
                          component="p"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price ($) <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="price"
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        />
                        <ErrorMessage
                          name="price"
                          component="p"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      {/* Stock */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stock Quantity <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="countInStock"
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        />
                        <ErrorMessage
                          name="countInStock"
                          component="p"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="description"
                        as="textarea"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />
                      <ErrorMessage
                        name="description"
                        component="p"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  </div>

                  {/* Product Attributes Section */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                      Product Attributes
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="category"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        >
                          <option value="">Select Category</option>
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="category"
                          component="p"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="gender"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        >
                          <option value="">Select Gender</option>
                          {genders.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="gender"
                          component="p"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      {/* Brand */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Brand <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="brand"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        >
                          <option value="">Select Brand</option>
                          {brands.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="brand"
                          component="p"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      {/* Material */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Material <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="material"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        >
                          <option value="">Select Material</option>
                          {materials.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="material"
                          component="p"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                      Available Sizes
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {sizes.map((s) => (
                        <label
                          key={s}
                          className={`cursor-pointer px-4 py-2 rounded-lg border-2 transition-all ${
                            values.sizes.includes(s)
                              ? "border-amber-500 bg-amber-50 text-amber-700"
                              : "border-gray-300 hover:border-amber-500"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={values.sizes.includes(s)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFieldValue("sizes", [...values.sizes, s]);
                              } else {
                                setFieldValue(
                                  "sizes",
                                  values.sizes.filter((x) => x !== s),
                                );
                              }
                            }}
                          />
                          {s}
                        </label>
                      ))}
                    </div>
                    <ErrorMessage
                      name="sizes"
                      component="p"
                      className="mt-2 text-sm text-red-500"
                    />
                  </div>

                  {/* Color Selection */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                      Available Colors
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {colors.map((c) => (
                        <label
                          key={c}
                          className={`cursor-pointer px-4 py-2 rounded-lg border-2 transition-all ${
                            values.colors.includes(c.toLowerCase())
                              ? "border-amber-500 bg-amber-50 text-amber-700"
                              : "border-gray-300 hover:border-amber-500"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={values.colors.includes(c.toLowerCase())}
                            onChange={(e) => {
                              const colorValue = c.toLowerCase();
                              if (e.target.checked) {
                                setFieldValue("colors", [
                                  ...values.colors,
                                  colorValue,
                                ]);
                              } else {
                                setFieldValue(
                                  "colors",
                                  values.colors.filter((x) => x !== colorValue),
                                );
                              }
                            }}
                          />
                          {c}
                        </label>
                      ))}
                    </div>
                    <ErrorMessage
                      name="colors"
                      component="p"
                      className="mt-2 text-sm text-red-500"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                      Product Images
                    </h2>

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-500 transition-colors">
                      <input
                        type="file"
                        id="imageUpload"
                        multiple
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(
                            e.target.files,
                            setFieldValue,
                            values.images,
                          )
                        }
                        disabled={values.images.length >= MAX_IMAGES}
                        className="hidden"
                      />

                      <label
                        htmlFor="imageUpload"
                        className={`cursor-pointer inline-flex flex-col items-center ${
                          values.images.length >= MAX_IMAGES
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <FaCloudUploadAlt className="text-5xl text-gray-400 mb-3" />
                        <p className="text-sm text-gray-600 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB (Max {MAX_IMAGES} images)
                        </p>
                      </label>
                    </div>

                    {/* Image Preview */}
                    {values.images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Uploaded Images ({values.images.length}/{MAX_IMAGES})
                        </p>
                        <div className="flex flex-wrap gap-4">
                          {values.images.map((img, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={img.url}
                                alt={`Product ${index + 1}`}
                                className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 group-hover:border-amber-500 transition-all"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setFieldValue(
                                    "images",
                                    values.images.filter((_, i) => i !== index),
                                  )
                                }
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          ))}

                          {/* Uploading Placeholders */}
                          {uploadingCount > 0 &&
                            Array.from({ length: uploadingCount }).map(
                              (_, i) => (
                                <div
                                  key={i}
                                  className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse border-2 border-gray-300"
                                />
                              ),
                            )}
                        </div>
                      </div>
                    )}

                    <ErrorMessage
                      name="images"
                      component="p"
                      className="mt-2 text-sm text-red-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || uploadingCount > 0}
                    className="w-full bg-amber-500 text-white py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating Product...
                      </>
                    ) : (
                      "Update Product"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
