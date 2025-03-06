import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axiosInstance';

export const getCategory = createAsyncThunk(
    'category/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/category');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addCategory  = createAsyncThunk(
    'category/addCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/category', categoryData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async ({id, updateData}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/category${id}`, updateData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/category${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: [],
        categoryLoading: false,
        categoryError: null,
        addCategoryError: null,
        updateCategoryError: null,
        deleteCategoryError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.categoryLoading = true;
                state.categoryError = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categoryLoading = false;
                state.category = action.payload.data;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.categoryLoading = false;
                state.categoryError = action.payload;
            })
            .addCase(addCategory.pending, (state) => {
                state.categoryLoading = true;
                state.addCategoryError = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categoryLoading = false;
                state.category.push(action.payload.data);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.categoryLoading = false;
                state.addCategoryError = action.payload;
            })
            .addCase(updateCategory.pending, (state) => {
                state.categoryLoading = true;
                state.updateCategoryError = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.categoryLoading = false;
                const index = state.category.findIndex(action.payload.data.id);
                if (index !== -1 ) {
                    state.category[index] = action.payload.data;
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.categoryLoading = false;
                state.updateCategoryError = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.categoryLoading = true;
                state.deleteCategoryError = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categoryLoading = false;
                state.category = state.category.filter(
                    (category) => category.id !== action.payload.data.id
                );
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.categoryLoading = false;
                state.deleteCategoryError = action.payload;
            });
    }
});

export default categorySlice.reducer; 