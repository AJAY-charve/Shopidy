import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders",
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders?page=${page}&limit=${limit}`,
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
    })


export const fetchOrderDetails = createAsyncThunk("orders/fetchOrderDetails",
    async ({ orderId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
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


const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrder: 0,
        orderDetails: null,
        page: 1,
        totalPages: 0,
        totalOrdersData: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload.orders
                state.page = action.payload.page
                state.totalPages = action.payload.totalPages
                state.totalOrdersData = action.payload.totalOrdersData
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false
                state.orderDetails = action.payload
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
})

export default orderSlice.reducer