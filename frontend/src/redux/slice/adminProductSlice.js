import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchProducts",
    async ({ page = 1, limit = 10 }) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/products?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    }
);

export const createProduct = createAsyncThunk("adminProdcuts/createProduct",
    async ({ productData }, { rejectWithValue }) => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return response.data
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateProduct = createAsyncThunk("adminProdcuts/updateProduct",
    async ({ id, productData }) => {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data
    }
)

export const deleteProduct = createAsyncThunk(
    "adminProducts/deleteProduct",
    async (id) => {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return id;
    }
);

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        page: 1,
        totalPages: 1,
        totalProducts: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
                state.totalProducts = action.payload.totalProducts;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((product) => product._id === action.payload._id)
                if (index !== -1) {
                    state.products[index] = action.payload
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (p) => p._id !== action.payload
                );
            });
    },
});

export default adminProductSlice.reducer;
