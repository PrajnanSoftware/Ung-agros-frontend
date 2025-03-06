import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import axios from "axios";
import Category from "../../../../ecom-backend/src/models/categoryModel";

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/product');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
);

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/product', productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/product/${id}`, productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/product/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productsLoading: false,
        productError: null,
        productAddError: null,
        productUpdateError: null,
        productDeleteError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.productsLoading = true;
                state.productError = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.productsLoading = false;
                state.products = action.payload.data;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.productsLoading = false;
                state.productError = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.productsLoading = true;
                state.productAddError = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.productsLoading = false;
                state.products.push(action.payload.data);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.productsLoading = false;
                state.productAddError = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.productsLoading = true;
                state.productUpdateError = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.productsLoading = false;
                const index = state.products.findIndex(action.payload.data.id);
                if (index !== -1) {
                    state.products[index] = action.payload.data;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.productsLoading = false;
                state.productUpdateError = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.productsLoading = true;
                state.productDeleteError = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.productsLoading = false;
                state.products = state.products.filter(
                    (category) => category.id !== action.payload.data.id
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.productsLoading = false;
                state.productDeleteError = action.payload;
            });
            
    }
});

export default productSlice.reducer;