import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// helper funtion to load cart form localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart")
    return storedCart ? JSON.parse(storedCart) : { products: [] }
}

const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

export const fetchCart = createAsyncThunk("cart/fetchCart",
    async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    params: { userId }
                }
            )
            return response.data
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data)
        }
    })


export const addToCart = createAsyncThunk("cart/addToCart",
    async ({ productId, quantity, size, color, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    productId,
                    quantity,
                    size,
                    color,
                    userId
                }
            )
            return response.data
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data)
        }
    }
)


export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity",
    async ({ productId, quantity, userId, size, color }, { rejectWithValue }) => {

        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    productId,
                    quantity,
                    size,
                    color,
                    userId
                }
            )
            return response.data
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data)
        }
    }
)


export const removeFromCart = createAsyncThunk("cart/removeFromCart",
    async ({ productId, userId, size, color,
    }, { rejectWithValue }) => {

        console.log("product", productId, userId, size, color);


        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    data: {
                        productId,
                        size,
                        color,
                        userId,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            return response.data
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data)
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] }
            localStorage.removeItem("cart")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to fetch cart"
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to add to cart"
            })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message || "Failed to update items quantity"
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to remove item"
            })
    }
})


export const { clearCart } = cartSlice.actions
export default cartSlice.reducer