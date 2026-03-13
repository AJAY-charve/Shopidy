import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all user (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers",
    async ({ page = 1, limit = 10 }) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data
    }
)


export const addUser = createAsyncThunk(
    "admin/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const updateUser = createAsyncThunk("admin/updateUser",
    async ({ id, name, email, role }) => {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            { id, name, email, role },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data
    }
)

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (id) => {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return id;
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        page: 1,
        totalPages: 1,
        totalUsers: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload.users
                state.page = action.payload.page
                state.totalPages = action.payload.totalPages
                state.totalUsers = action.payload.totalUsers
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload.user;

                const index = state.users.findIndex(
                    (u) => u._id === updatedUser._id
                );

                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.users = state.users.filter((user) => user._id !== action.payload)
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.unshift(action.payload.user);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(
                    (user) => user._id !== action.payload
                );
                state.totalUsers -= 1;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})


export default adminSlice.reducer
