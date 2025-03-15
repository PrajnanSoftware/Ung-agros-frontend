import React, { useEffect, useState } from 'react';
import logo from '../assets/logo (2).png';
import { clearError, register } from '../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { axiosInstance } from '../utils/axiosInstance';
// import verifyOtpPage from './VerifyOtpPage';

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
    const { error, loading, isAuthenticated, success } = useSelector((state) => state.user);

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

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


    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'name':
                if (!value.trim()) error = 'Name is required';
                else if (value.length < 3) error = 'Name must be at least 3 characters';
                break;
            case 'email':
                if (!value) error = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+$/.test(value)) error = 'Invalid email format';
                break;
            case 'phone':
                if (!value) error = 'Phone is required';
                else if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits';
                break;
            case 'password':
                if (!value) error = 'Password is required';
                else if (value.length < 8) error = 'Password must be at least 8 characters';
                break;
            case 'confirm':
                if (!value) error = 'Confirm Password is required';
                else if (value.length < 8 && value !== formData.password) error = 'Passwords do not match';
                console.log(error)
                break;
            default:
                break;
        }
        return error;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));

        if (touched[name]) {
            setErrors(prev => ({...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        if (!touched[name]) {
            setTouched(prev => ({...prev, [name]: true }));
            setErrors(prev => ({...prev, [name]: validateField(name, formData[name]) }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});

        setTouched(newTouched);

        const newErrors = Object.entries(formData).reduce((acc, [key, value]) => {
            acc[key] = validateField(key, value);
            return acc;
        }, {});

        setErrors(newErrors);
        
        const isValid = Object.values(newErrors).every(error => !error);

        if (isValid) {
            // dispatch(register(formData));
            const response = await axiosInstance.post('/users/generateOTP', {email:formData.email, type: 'email'});

            if (response.data.status === 'success') {
                navigate('/verify-otp', {
                    state: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        password: formData.password,
                        otpToken: response.data.otpToken,
                    }
                })
            }
        }
    };

  return (
    <div className='p-10' data-aos="fade-up">
        <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg border shadow-md'>
            <div className='text-center pb-10'>
                <img src={logo} alt="logo" width={75} height={75} className='m-auto' />
                <h1 className='text-3xl font-bold text-primary'>Sign Up</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error">{error.message}</div>}
                    <div>
                        <label htmlFor="name" className='block text-dark mb-2'>
                            Name*
                        </label>
                        <input type="text" name="name" id="name"
                            className={`w-full p-3 border border-dark rounded-lg mb-5 focus:outline-none focus:ring-2 ${ errors["name"] && touched["name"] ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'}`}
                            value={formData.name} onChange={handleChange} required  onBlur={handleBlur} disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className='block text-dark mb-2'>
                            Email*
                        </label>
                        <input type="email" name="email" id="email"
                            className={`w-full p-3 border border-dark rounded-lg mb-5 focus:outline-none focus:ring-2 ${ errors["email"] && touched["email"] ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'}`}
                            value={formData.email} onChange={handleChange} required onBlur={handleBlur} disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className='block text-dark mb-2'>
                            Phone*
                        </label>
                        <input type="text" name="phone" id="phone" 
                            className={`w-full p-3 border border-dark rounded-lg mb-5 focus:outline-none focus:ring-2 ${ errors["phone"] && touched["phone"] ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'}`}
                            value={formData.phone} onChange={handleChange} required onBlur={handleBlur} disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className='block text-dark mb-2'>
                            Password*
                        </label>
                        <input type="password" name="password" id="password" 
                            className={`w-full p-3 border border-dark rounded-lg mb-5 focus:outline-none focus:ring-2 ${ errors["password"] && touched["password"] ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'}`}
                            value={formData.password} onChange={handleChange} required onBlur={handleBlur} disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm" className='block text-dark mb-2'>
                            Confirm Password*
                        </label>
                        <input type="password" name="confirm" id="confirm" 
                            className={`w-full p-3 border border-dark rounded-lg mb-5 focus:outline-none focus:ring-2 ${ errors["confirm"] && touched["confirm"] ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'}`}
                            value={formData.confirm} onChange={handleChange} required onBlur={handleBlur} disabled={loading}
                        />
                    </div>

                    <button type="submit" 
                        className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors  ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`} disabled={loading}>
                            {loading ? 'Processing...' : 'Send OTP'}
                    </button>
                </form>
            </div>
            <div className='text-center p-4'>
                <p>Already have an acoount? <a href="/login">Login</a></p>
            </div>
        </div>
    </div>
  )
}

export default SignUpPage