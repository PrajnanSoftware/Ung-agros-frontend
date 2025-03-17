import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async ({ name, category, minPrice, maxPrice, page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            console.log("Getting Products")
            const response = await axiosInstance.get('/product', {
                params: { name, category, minPrice, maxPrice, page, limit }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
);

export const findProductById = createAsyncThunk(
    'product/findByid',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/product/findById/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)

export const findProductSuggestion = createAsyncThunk(
    'product/suggestion',
    async ({category, page=1, limit=10}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/product`,{
                params: { category, page, limit }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)

export const getTopSellingProducts = createAsyncThunk(
    'product/top-selling',
    async (_, { rejectWithValue }) => {
        try {
            console.log("Getting Products")
            const response = await axiosInstance.get('/product/top-selling');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
);

export const getNewProducts = createAsyncThunk(
    'product/new',
    async (_, { rejectWithValue }) => {
        try {
            console.log("Getting Products")
            const response = await axiosInstance.get('/product/new');
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
    name: 'products',
    initialState: {
        products: [],
        productDetail: null,
        productDetailLoading: false,
        productDetailError: null,
        totalPages: 0,
        currentPage: 0,
        totalProducts: 0,
        topSellingProducts: [],
        newProducts: [],
        productSuggestion: [],
        productSuggestionLoading: false,
        productSuggestionError: false,
        productsLoading: false,
        topSellingProductLoading: false,
        newProductsLoading: false,
        productError: null,
        newProductError: null,
        topSellingProductError: null,
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
                if (action.payload.currentPage === 1) {
                    state.products = action.payload.data; 
                } else {
                    state.products = [...state.products, ...action.payload.data]; 
                }
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.totalProducts = action.payload.totalProducts;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.productsLoading = false;
                state.productError = action.payload;
            })
            .addCase(getTopSellingProducts.pending, (state) => {
                state.topSellingProductLoading = true;
                state.topSellingProductError = null;
            })
            .addCase(getTopSellingProducts.fulfilled, (state, action) => {
                state.topSellingProductLoading = false;
                state.topSellingProducts = action.payload.data;
            })
            .addCase(getTopSellingProducts.rejected, (state, action) => {
                state.topSellingProductLoading = false;
                state.topSellingProductError = action.payload;
            })
            .addCase(getNewProducts.pending, (state) => {
                state.newProductsLoading = true;
                state.newProductError = null;
            })
            .addCase(getNewProducts.fulfilled, (state, action) => {
                state.newProductsLoading = false;
                state.newProducts = action.payload.data;
            })
            .addCase(getNewProducts.rejected, (state, action) => {
                state.newProductsLoading = false;
                state.newProductError = action.payload;
            })

            .addCase(findProductById.pending, (state) => {
                state.productDetailLoading = true;
                state.productDetailError = null;
                state.productDetail = null;
            })
            .addCase(findProductById.fulfilled, (state, action) => {
                state.productDetailLoading = false;
                state.productDetail = action.payload.data;
            })
            .addCase(findProductById.rejected, (state, action) => {
                state.productDetailLoading = false;
                state.productDetailError = action.payload;
            })

            .addCase(findProductSuggestion.pending, (state) => {
                state.productSuggestionLoading = true;
                state.productSuggestionError = null;
            })
            .addCase(findProductSuggestion.fulfilled, (state, action) => {
                state.productSuggestionLoading = false;
                state.productSuggestion = action.payload.data;
            })
            .addCase(findProductSuggestion.rejected, (state, action) => {
                state.productSuggestionLoading = false;
                state.productSuggestionError = action.payload;
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
                const index = state.products.findIndex((p) => p.id === action.payload.data.id);
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
                    (product) => product.id !== action.payload.data.id
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.productsLoading = false;
                state.productDeleteError = action.payload;
            });
            
    }
});

export default productSlice.reducer;