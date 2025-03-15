import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slice/userSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
        if (isAuthenticated) {
            navigate('/');
        }

        if (!email || !name || !phone || !password || !otpToken) {
            navigate('/login');
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
            
        } catch (err) {
            setError(err.response?.data?.message || "OTP verification failed");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="otp" className='block text-dark mb-2'>
                OTP*
            </label>
            <input type="text" name='otp' id='otp' 
                className={`w-full p-3 border border-dark rounded-lg mb-5 focus:outline-none focus:ring-2 `}
                value={otp} onChange={(e) => {setOtp(e.target.value)}} required disabled={loading}
            />
            <button type="submit" 
                className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors  ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`} disabled={loading}>
                {loading ? 'Processing...' : 'Verify'}
            </button>
        </form>
    </div>
  )
}

export default VerifyOtpPage