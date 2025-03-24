import React, { useEffect, useState } from 'react';
import logo from '../assets/logo (2).png';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AOS from 'aos';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(user?.role === 'admin' ? '/dashboard' : '/');
        }
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        dispatch(clearError());
    }, []);

    // ✅ Email Validation
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+$/.test(email);
    };

    // ✅ Password Validation
    const isValidPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}$/.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // let formErrors = {};
        // if (!isValidEmail(email)) {
        //     formErrors.email = "Invalid email format.";
        // }
        // if (!isValidPassword(password)) {
        //     formErrors.password = "Password must be 8+ chars, include uppercase, lowercase and number.";
        // }

        // if (Object.keys(formErrors).length > 0) {
        //     setErrors(formErrors);
        //     return;
        // }

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            toast.success('Login successful');
        } catch (error) {
            toast.error(error?.message || 'Something went wrong. Try again');
        }
    };

    return (
        <div className='p-10' data-aos="fade-up">
            <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg border shadow-md'>
                <div className='text-center pb-10'>
                    <img src={logo} alt="logo" width={75} height={75} className='m-auto' />
                    <h1 className='text-3xl font-bold text-secondary'>Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-600 text-center">{error.message}</div>}

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className='block text-dark mb-2'>Email*</label>
                        <input type="email" name="email" id="email"
                            className={`w-full p-3 border rounded-lg mb-2 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'}`}
                            value={email} onChange={(e) => setEmail(e.target.value)} required
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div className='relative'>
                        <label htmlFor="password" className='block text-dark mb-2'>Password*</label>
                        <input type={showPassword ? "text" : "password"} name="password" id="password" 
                            className={`w-full p-3 border rounded-lg mb-2 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'}`}
                            value={password} onChange={(e) => setPassword(e.target.value)} required
                        />
                        <button type="button" className="absolute right-2 top-12" onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* Forgot Password */}
                    <div className='text-right mb-4'>
                        <button type="button" onClick={() => navigate('/forgot-password')} className='text-primary hover:underline'>
                            Forgot Password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" 
                        className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`} 
                        disabled={loading}>
                        { loading ? (
                            <div className="flex justify-center items-center">
                                <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : 'Login'}
                    </button>
                </form>

                {/* Signup Link */}
                <div className='text-center p-4'>
                    <p>Don't have an account? <span className='hover:cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
