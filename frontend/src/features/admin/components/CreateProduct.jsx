import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { createProduct } from "../../../redux/slice/adminProductSlice";
import { toast } from "sonner";

const MAX_IMAGES = 4;

const categories = ["Top Wear", "Bottom Wear"];
const genders = ["Men", "Women", "Unisex"];
const colors = ["red", "blue", "black", "yellow", "white", "pink", "beige"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const materials = ["Cotton", "Denim", "Wool", "Silk"];
const brands = ["Urban Threads", "Fashionista", "ChicStyle"];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
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

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadingCount, setUploadingCount] = useState(0);

  const handleImageUpload = async (files, setFieldValue, currentImages) => {
    if (!files.length) return;

    const remaining = MAX_IMAGES - currentImages.length;
    if (remaining <= 0) {
      toast.error("❌ Maximum 4 images allowed");
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
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setFieldValue("images", [
          ...currentImages,
          { url: data.imageUrl, altText: "" },
        ]);
      } catch (error) {
        toast.error("❌ Image upload failed");
      } finally {
        setUploadingCount((c) => c - 1);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-2 lg:p-4 xl:p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Create Product</h2>

      <Formik
        initialValues={{
          name: "",
          description: "",
          price: "",
          countInStock: "",
          sku: "",
          category: "",
          brand: "",
          material: "",
          gender: "",
          sizes: [],
          colors: [],
          images: [],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await dispatch(createProduct({ productData: values })).unwrap();
            toast.success("✅ Product created successfully");
            resetForm();
            navigate("/admin/products");
          } catch (error) {
            toast.error("❌ Product create failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            {/* NAME */}
            <div className="mb-5">
              <label className="font-semibold">Product Name</label>
              <Field
                name="name"
                type="text"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-5">
              <label className="font-semibold">Description</label>
              <Field
                name="description"
                as="textarea"
                rows={4}
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* PRICE */}
            <div className="mb-5">
              <label className="font-semibold">Price</label>
              <Field
                name="price"
                type="number"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* STOCK */}
            <div className="mb-5">
              <label className="font-semibold">Stock</label>
              <Field
                name="countInStock"
                type="number"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="countInStock"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* SKU */}
            <div className="mb-5">
              <label className="font-semibold">SKU</label>
              <Field
                name="sku"
                type="text"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="sku"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* CATEGORY */}
            <div className="mb-5">
              <label className="font-semibold">Category</label>
              <Field
                name="category"
                as="select"
                className="w-full border p-2 rounded"
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
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* BRAND */}
            <div className="mb-5">
              <label className="font-semibold">Brand</label>
              <Field
                name="brand"
                as="select"
                className="w-full border p-2 rounded"
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
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* MATERIAL */}
            <div className="mb-5">
              <label className="font-semibold">Material</label>
              <Field
                name="material"
                as="select"
                className="w-full border p-2 rounded"
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
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* GENDER */}
            <div className="mb-5">
              <label className="font-semibold">Gender</label>
              <Field
                name="gender"
                as="select"
                className="w-full border p-2 rounded"
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
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* SIZES */}
            <div className="mb-5">
              <label className="font-semibold">Sizes</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {sizes.map((s) => (
                  <label key={s} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={values.sizes.includes(s)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue("sizes", [...values.sizes, s]);
                        } else {
                          setFieldValue(
                            "sizes",
                            values.sizes.filter((x) => x !== s)
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
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* COLORS */}
            <div className="mb-5">
              <label className="font-semibold">Colors</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {colors.map((c) => (
                  <label key={c} className="flex gap-2 items-center capitalize">
                    <input
                      type="checkbox"
                      checked={values.colors.includes(c)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue("colors", [...values.colors, c]);
                        } else {
                          setFieldValue(
                            "colors",
                            values.colors.filter((x) => x !== c)
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
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Upload Images (Max 4)
              </label>

              <label
                className={`inline-block px-4 py-2 rounded-md text-white cursor-pointer transition
                  ${
                    values.images.length >= MAX_IMAGES
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                Choose Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(
                      e.target.files,
                      setFieldValue,
                      values.images
                    )
                  }
                  disabled={values.images.length >= MAX_IMAGES}
                  className="hidden"
                />
              </label>

              {values.images.length >= MAX_IMAGES && (
                <p className="text-red-600 text-sm mt-2">
                  Maximum 4 images reached
                </p>
              )}

              <div className="flex flex-wrap gap-4 mt-4">
                {values.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.url}
                      className="w-24 h-24 object-cover rounded-md shadow"
                      alt=""
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "images",
                          values.images.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {uploadingCount > 0 &&
                  Array.from({ length: uploadingCount }).map((_, i) => (
                    <div
                      key={i}
                      className="w-24 h-24 bg-gray-200 rounded-md animate-pulse"
                    />
                  ))}
              </div>
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || uploadingCount > 0}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Create Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
