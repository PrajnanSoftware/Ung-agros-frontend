import React, { useEffect, useState } from 'react';
import logo from '../assets/logo (2).png';
import { clearError, register } from '../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { axiosInstance } from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirm: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAuthenticated } = useSelector((state) => state.user);

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const validateField = (name, value, password) => {
        let error = '';
        switch (name) {
            case 'name':
                const trimmedName = value.trim();
                if (!trimmedName) error = 'Name is required';
                else if (trimmedName.length < 3) error = 'Name must be at least 3 characters';
                break;
            case 'email':
                const trimmedEmail = value.trim();
                if (!trimmedEmail) error = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+$/.test(trimmedEmail)) error = 'Invalid email format';
                break;
            case 'phone':
                const trimmedPhone = value.trim();
                if (!trimmedPhone) error = 'Phone is required';
                else if (!/^\d{10}$/.test(trimmedPhone)) error = 'Phone must be 10 digits';
                break;
            case 'password':
                if (!value) error = 'Password is required';
                else if (value.length < 8) error = 'Password must be at least 8 characters';
                else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) error = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
                break;
            case 'confirm':
                if (!value) error = 'Confirm Password is required';
                else if (value !== password) error = 'Passwords do not match';
                break;
            default:
                break;
        }
        return error;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle phone number input to only allow digits
        const processedValue = name === 'phone' ? value.replace(/\D/g, '') : value;
        
        setFormData(prev => ({ ...prev, [name]: processedValue }));
        
        // Validate current field and related fields
        if (touched[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                if (name === 'password') {
                    newErrors.password = validateField('password', processedValue);
                    newErrors.confirm = validateField('confirm', formData.confirm, processedValue);
                } else if (name === 'confirm') {
                    newErrors.confirm = validateField('confirm', processedValue, formData.password);
                } else {
                    newErrors[name] = validateField(name, processedValue);
                }
                return newErrors;
            });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (!touched[name]) {
            setTouched(prev => ({ ...prev, [name]: true }));
            let error;
            if (name === 'confirm') {
                error = validateField(name, value, formData.password);
            } else {
                error = validateField(name, value);
            }
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const newTouched = Object.keys(formData).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {});
            setTouched(newTouched);

            const newErrors = Object.entries(formData).reduce((acc, [key, value]) => {
                if (key === 'confirm') {
                    acc[key] = validateField(key, value, formData.password);
                } else {
                    acc[key] = validateField(key, value);
                }
                return acc;
            }, {});
            setErrors(newErrors);

            const isValid = Object.values(newErrors).every(error => !error);
            if (isValid) {
                const response = await axiosInstance.post('/users/generateOTP', { 
                    email: formData.email.trim(), 
                    type: 'email' 
                });
                
                if (response.data.status === 'success') {
                    navigate('/verify-otp', {
                        state: {
                            name: formData.name.trim(),
                            email: formData.email.trim(),
                            phone: formData.phone.trim(),
                            password: formData.password,
                            otpToken: response.data.otpToken,
                        }
                    });
                    toast.success("OTP sent successfully!");
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-10' data-aos="fade-up">
            <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg border shadow-md'>
                <div className='text-center pb-10'>
                    <img src={logo} alt="logo" width={75} height={75} className='m-auto' />
                    <h1 className='text-3xl font-bold text-secondary'>Sign Up</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-2'>
                            <label htmlFor="name" className='block text-dark mb-2'>
                                Name*
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name"
                                className={`w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 ${
                                    errors.name && touched.name ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'
                                }`}
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={loading}
                                required
                            />
                            {errors.name && touched.name && (
                                <div className="text-red-500 text-sm mb-4">{errors.name}</div>
                            )}
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="email" className='block text-dark mb-2'>
                                Email*
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                className={`w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 ${
                                    errors.email && touched.email ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'
                                }`}
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={loading}
                                required
                            />
                            {errors.email && touched.email && (
                                <div className="text-red-500 text-sm mb-4">{errors.email}</div>
                            )}
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="phone" className='block text-dark mb-2'>
                                Phone*
                            </label>
                            <input 
                                type="tel" 
                                name="phone" 
                                id="phone"
                                className={`w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 ${
                                    errors.phone && touched.phone ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'
                                }`}
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={loading}
                                maxLength="10"
                                required
                            />
                            {errors.phone && touched.phone && (
                                <div className="text-red-500 text-sm mb-4">{errors.phone}</div>
                            )}
                        </div>
                        <div className='relative mb-2'>
                            <label htmlFor="password" className='block text-dark mb-2'>
                                Password*
                            </label>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                id="password"
                                className={`w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 ${
                                    errors.password && touched.password ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'
                                }`}
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={loading}
                                required
                            />
                            <button 
                                type="button" 
                                className="absolute right-2 top-12" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                            </button>
                            {errors.password && touched.password && (
                                <div className="text-red-500 text-sm mb-4">{errors.password}</div>
                            )}
                        </div>
                        <div className='relative mb-2'>
                            <label htmlFor="confirm" className='block text-dark mb-2'>
                                Confirm Password*
                            </label>
                            <input 
                                type={showConfirm ? "text" : "password"} 
                                name="confirm" 
                                id="confirm"
                                className={`w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 ${
                                    errors.confirm && touched.confirm ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'
                                }`}
                                value={formData.confirm}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={loading}
                                required
                            />
                            <button 
                                type="button" 
                                className="absolute right-2 top-12" 
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                            </button>
                            {errors.confirm && touched.confirm && (
                                <div className="text-red-500 text-sm mb-4">{errors.confirm}</div>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className={`w-full mt-2 py-3 px-6 text-white font-semibold rounded-lg transition-colors ${
                                loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'
                            }`} 
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : 'Send OTP'}
                        </button>
                    </form>
                </div>
                <div className='text-center p-4'>
                    <p>Already have an account? <span className='text-primary hover:cursor-pointer hover:underline' onClick={() => navigate('/login')}>Login</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;