import React, { useEffect, useState } from 'react';
import logo from '../assets/logo (2).png';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        try {
            
            e.preventDefault();
            await dispatch(loginUser({ email, password })).unwrap();
            toast.success('Login successful')
        } catch (error) {
            toast.error('Something went wrong. try again')
        }
    };

  return (
    <div className='p-10'>
        <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg border shadow-md'>
            <div className='text-center pb-10'>
                <img src={logo} alt="logo" width={75} height={75} className='m-auto' />
                <h1 className='text-3xl font-bold'>Login</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-600 text-center">{error.message}</div>}
                    <div>
                        <label htmlFor="email" className='block text-dark mb-2'>
                            Email*
                        </label>
                        <input type="email" name="email" id="email"
                            className={`w-full p-3 border border-dark rounded-lg mb-5 focus:outline-none focus:ring-2`}
                            value={email} onChange={(e) => setEmail(e.target.value)} required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className='block text-dark mb-2'>
                            Password*
                        </label>
                        <input type="text" name="password" id="password" 
                            className={`w-full p-3 border border-dark rounded-lg mb-5 focus:outline-none focus:ring-2`}
                            value={password} onChange={(e) => setPassword(e.target.value)} required
                        />
                    </div>
                    <button type="submit" 
                        className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors  ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`} disabled={loading}>
                            { loading ? (
                                <div className="flex justify-center items-center">
                                    <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : 'Login'}
                    </button>
                </form>
            </div>
            <div className='text-center p-4'>
                <p>Don't have an acoount? <span className='hover:cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span></p>
            </div>
        </div>
    </div>
  )
}

export default LoginPage