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
export const updateUser = createAsyncThunk(
    'users/update',
    async (updateData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put('/users/profile', updateData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const getUserAddress = createAsyncThunk(
    'user/getAddress',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get('/address');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const updateUserAddress = createAsyncThunk(
    'user/updateAddress',
    async ({id, addressData}, { rejectWithValue }) => {
        try {
            console.log("Updating Address")
            const response = await axiosInstance.put(`/address/${id}`, addressData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const addNewAddress = createAsyncThunk(
    'user/newAddress',
    async (addressData, { rejectWithValue }) => {
        try {
            console.log("Add new address")
            const response = await axiosInstance.post(`/address`, addressData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
// TODO: 3. Reset Password

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userAddress: null,
        loading: false,
        error: null,
        userAddressError: null,
        success: false,
        isAuthenticated: false,
        initialized: false
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearAddressError: (state) => {
            state.userAddressError = null;
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
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload.data.user)
                state.user = action.payload.data.user;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Address
            .addCase(getUserAddress.pending, (state) => {
                state.loading = true;
                state.userAddressError = null;
            })
            .addCase(getUserAddress.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload.data)
                state.userAddress = action.payload.data;
            })
            .addCase(getUserAddress.rejected, (state, action) => {
                state.loading = false;
                state.userAddressError = action.payload;
            })
            .addCase(updateUserAddress.pending, (state) => {
                state.loading = true;
                state.userAddressError = null;
            })
            .addCase(updateUserAddress.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload.data)
                state.userAddress = action.payload.data.address;
            })
            .addCase(updateUserAddress.rejected, (state, action) => {
                state.loading = false;
                state.userAddressError = action.payload;
            })
            .addCase(addNewAddress.pending, (state) => {
                state.loading = true;
                state.userAddressError = null;
            })
            .addCase(addNewAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.userAddress = action.payload.address;
            })
            .addCase(addNewAddress.rejected, (state, action) => {
                state.loading = false;
                state.userAddressError = action.payload;
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
                state.userAddressError = null;
                state.userAddress = null;
                state.error = null;
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

export const { clearError, clearAddressError } = userSlice.actions;
export default userSlice.reducer;