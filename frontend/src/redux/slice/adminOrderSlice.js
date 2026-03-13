import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`;

export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch orders"
            );
        }
    }
);


export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to update order status"
            );
        }
    }
);

export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to delete order"
            );
        }
    }
);

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        page: 1,
        totalPages: 0,
        totalOrdersData: 0,
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearStatus(state) {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.totalOrders = action.payload.orders.length;
                state.totalSales = action.payload.orders.reduce(
                    (acc, order) => acc + Number(order.totalPrice),
                    0
                );
                state.page = action.payload.page
                state.totalPages = action.payload.totalPages
                state.totalOrdersData = action.payload.totalOrders
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload;

                const index = state.orders.findIndex(
                    (order) => order._id === updatedOrder._id
                );
                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                }
                state.successMessage = "Order status updated successfully";
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(
                    (order) => order._id !== action.payload
                );
                state.totalOrders = state.orders.length;
                state.totalSales = state.orders.reduce(
                    (acc, order) => acc + Number(order.totalPrice),
                    0
                );
                state.successMessage = "Order deleted successfully";
            });
    },
});

export const { clearStatus } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
