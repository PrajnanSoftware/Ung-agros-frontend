import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosInstance } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo (2).png';
import AOS from 'aos';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axiosInstance.post(`/users/forgot-password`, { email })
            console.log(data);
            if (data.status === "success") {
                toast.success(data.message)
                navigate('/login')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
            setMsg(error?.response?.data?.message|| "Something went wrong")
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='p-10' data-aos="fade-up">
            <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg border shadow-md pb-20'>
            <div className='mb-10 text-center'>
                <img src={logo} alt="logo" width={75} height={75} className='m-auto' />
                <h1 className='text-3xl font-bold text-primary'>Forgot Password</h1>
            </div>
            <form onSubmit={handleSubmit}>
                {/* {error && <div className="text-center text-red-500">{error}</div>} */}
                <label htmlFor="email" className='block text-dark mb-2'>
                    Email*
                </label>
                <input type="email" name='email' id='email' placeholder='Enter email'
                    className={`w-full p-3 border border-dark rounded-lg mb-5 focus:outline-none focus:ring-2 `}
                    value={email} onChange={(e) => {setEmail(e.target.value)}} required disabled={loading}
                />
                <button type="submit" 
                    className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors  ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`} disabled={loading}>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : 'Send Reset Link'}
                </button>
            </form>
            {msg && <p className='pt-2'>{msg}</p>}
        </div>
        </div>
  )
}

export default ForgotPasswordPage