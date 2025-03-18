import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";

export const getCart = createAsyncThunk(
    'cart/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/cart');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addOrUpdateItemToCart = createAsyncThunk(
    'cart/addItem',
    async (itemData, { rejectWithValue }) => { 
        try {
            const response = await axiosInstance.post('/cart', itemData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteItemFromCart = createAsyncThunk(
    'cart/deleteItem',
    async (productId, { rejectWithValue }) => {
        try {
            console.log(productId)
            const response = await axiosInstance.delete('/cart', { data:productId});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkoutCart = createAsyncThunk(
    'cart/checkout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/cart/checkout');
            return response.data;
        } catch (error) {
            return rejectWithValue( error.response.data );
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        checkoutData: null,
        cartLoading: false,
        cartError: null,
        cartAddError: null,
        cartRemoveError: null,
        cartCheckoutError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder 
            // Get Cart Items
            .addCase(getCart.pending, (state) => {
                state.cartLoading = true;
                state.cartError = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cart = action.payload.cart.items;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.cartLoading = false;
                state.cart = [];
                state.cartError = action.payload;
            })
            // Add or Update Item to Cart
            .addCase(addOrUpdateItemToCart.pending, (state) => {
                state.cartLoading = true;
                state.cartAddError = null;
            })
            .addCase(addOrUpdateItemToCart.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cart = action.payload.savedCart.items;
            })
            .addCase(addOrUpdateItemToCart.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartAddError = action.payload;
            })
            // Delete Item from Cart
            .addCase(deleteItemFromCart.pending, (state) => {
                state.cartLoading = true;
                state.cartRemoveError = null;
            })
            .addCase(deleteItemFromCart.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cart = action.payload.savedCart.items;
            })
            .addCase(deleteItemFromCart.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartRemoveError = action.payload;
            })
            .addCase(checkoutCart.pending, (state) => {
                state.cartLoading = true;
                state.cartCheckoutError = null;
            })
            .addCase(checkoutCart.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.checkoutData = action.payload.newOrder;
            })
            .addCase(checkoutCart.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartCheckoutError = action.payload;
            });
    }
});

export default cartSlice.reducer;