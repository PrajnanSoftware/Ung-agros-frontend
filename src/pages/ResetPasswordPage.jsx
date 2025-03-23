import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo (2).png';
import AOS from 'aos';
import { toast } from 'react-toastify';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const ResetPasswordPage = () => {

    const { token } = useParams();
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const validateField = (name, value, password) => {
        let error = '';
        switch (name) {
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

        const processedValue = value;

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
        e.preventDefault();
        try {
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

                const { data } = await axiosInstance.post(`/users/password-reset/${token}`, formData);
                console.log(data)
                if (data.status === "success") {
                    toast.success(data.message)
                    navigate('/login')
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Something went wrong")
            setMessage(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

  return (
        <div className='p-10' data-aos="fade-up">
            <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg border shadow-md pb-20'>
            <div className='mb-10 text-center'>
                <img src={logo} alt="logo" width={75} height={75} className='m-auto' />
                <h1 className='text-3xl font-bold text-primary'>Reset Password</h1>
            </div>
            <form onSubmit={handleSubmit}>
                {/* {error && <div className="text-center text-red-500">{error}</div>} */}
                
                <div className='relative mb-2'>
                    <label htmlFor="password" className='block text-dark mb-2'>
                        Password*
                    </label>
                    <input type={showPassword ? "text" : "password"} name='password' id='password' placeholder='Enter password'
                        className={`w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 ${
                            errors.name && touched.name ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'
                        }`}
                        value={formData.password} onChange={handleChange} onBlur={handleBlur} required disabled={loading}
                    />
                    <button 
                        type="button" 
                        className="absolute right-2 top-12" 
                        onClick={() => setShowPassword(!showPassword)}>
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
                    <input type={showConfirm ? "text" : "password"} name='confirm' id='confirm' placeholder='Enter password'
                        className={`w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 ${
                            errors.confirm && touched.confirm ? 'border-red-500 focus:ring-red-500' : 'border-dark focus:ring-primary'
                        }`}
                        value={formData.confirm} onChange={handleChange} onBlur={handleBlur} required disabled={loading}
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
                
                <button type="submit" 
                    className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors mt-2 ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`} disabled={loading}>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : 'Reset Password'}
                </button>
            </form>
            {message && <p className='pt-2'>{message}</p>}
        </div>
        </div>
  )
}

export default ResetPasswordPage