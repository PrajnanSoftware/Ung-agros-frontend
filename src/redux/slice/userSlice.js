import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axiosInstance';

export const initializeAuth = createAsyncThunk(
    'users/initialize',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await dispatch(getUserProfile());
            return response.payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const register = createAsyncThunk(
    'users/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/users/register', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/users/login', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    'users/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axiosInstance.post('/users/logout');
        } catch (error) {
            return rejectWithValue(error.response.data);    
        }
    }
);

// TODO: 1. Get User Profile details
export const getUserProfile = createAsyncThunk(
    'users/profile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/users/profile');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message) 
        }
    }
)
// TODO: 2. Update user profile
// TODO: 3. Reset Password

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: false,
        isAuthenticated: false,
        initialized: false
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // initialization
            .addCase(initializeAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(initializeAuth.fulfilled, (state) => {
                state.loading = false;
                state.initialized = true;
            })
            .addCase(initializeAuth.rejected, (state) => {
                state.loading = false;
                state.initialized = true;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.success = true;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload.data.user)
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // GetProfile
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
              })
              .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data?.user;
                state.isAuthenticated = true;
              })
              .addCase(getUserProfile.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
              })
    }
}) 

export const { clearError } = userSlice.actions;
export default userSlice.reducer;