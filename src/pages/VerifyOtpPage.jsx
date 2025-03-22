import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slice/userSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../assets/logo (2).png';
import { toast } from 'react-toastify';

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.user);
    const { name, email, phone, password, otpToken } = location.state || {};
    
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            toast.success('Login successful')
            navigate('/');
        }

        if (!email || !name || !phone || !password || !otpToken) {
            toast.error('Please fill the required details')
            navigate('/signup');
        }
        AOS.init({ duration: 1000 });
    }, [isAuthenticated, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = {
                email,
                name,
                phone,
                password,
                otp,
                otpToken
            }
            await dispatch(register(formData)).unwrap();
            toast.success('Register successful')
            
        } catch (err) {
            toast.error('Something went wrong, try again.')
            setError(err.response?.data?.message || "OTP verification failed");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='min-h-[calc(100vh-100px)] pt-0 p-10 flex justify-center items-center flex-col' data-aos="fade-up">
        <div className='mb-10'>
            <img src={logo} alt="logo" width={75} height={75} className='m-auto' />
            <h1 className='text-3xl font-bold text-primary'>Verify your email</h1>
        </div>
        <form onSubmit={handleSubmit}>
            {error && <div className="text-center text-red-500">{error}</div>}
            <label htmlFor="otp" className='block text-dark mb-2'>
                OTP*
            </label>
            <input type="text" name='otp' id='otp' 
                className={`w-full p-3 border border-dark rounded-lg mb-5 focus:outline-none focus:ring-2 `}
                value={otp} onChange={(e) => {setOtp(e.target.value)}} required disabled={loading} maxLength="6"
            />
            <button type="submit" 
                className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors  ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`} disabled={loading}>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : 'Verify'}
            </button>
        </form>
    </div>
  )
}

export default VerifyOtpPage