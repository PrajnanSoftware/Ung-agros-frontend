import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HiPencil, HiCheck, HiX } from 'react-icons/hi'; // Icons for edit/cancel
import { clearError, updateUser } from '../redux/slice/userSlice';


const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [ emailSent, setEmailSent] = useState(false);
    const [phoneOtp, setPhoneOtp] = useState('');
    const [ otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);

    const requestEmailVerification = async () => {
        try {
            const response = await axiosInstance.post('/user/request-email-verification', { email: formData.email });
            if (response.data.success) {
                setEmailSent(true);
                console.log('Verification link sent to new email.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const requestPhoneOTP = async () => {
        try {
            const response = await axiosInstance.post('/user/request-phone-otp', { phone: formData.phone });
            if (response.data.success) {
                setOtpSent(true);
                console.log('OTP sent to new phone number.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const verifyOTP = async () => {
        try {
            const response = await axiosInstance.post('/user/verify-phone-otp', { phone: formData.phone, otp: phoneOTP });
            if (response.data.success) {
                setVerified(true);
                console.log('Phone number verified successfully.');
            } else {
                console.log('Invalid OTP.');
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user, editMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        // if (!verified && formData.phone !== user.phone) {
        //     alert('Please verify your phone number before saving.');
        //     return;
        // }
        try {
            // const response = await axiosInstance.put('/user/profile', formData);
            const response = await dispatch(updateUser(formData)).unwrap();
            setEditMode(false);
            alert('Profile updated successfully.');
        } catch (error) {
            console.error('Update failed:', error.response?.data);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">My Profile</h2>

            {/* Profile Info */}
            <div className="mt-6">
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                    <span className="text-gray-600">Name:</span>
                    {editMode ? (
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 w-2/3"
                        />
                    ) : (
                        <span className="text-gray-800 font-medium">{formData.name}</span>
                    )}
                </div>

                <div className="flex items-center justify-between border-b pb-2 mb-4">
                    <span className="text-gray-600">Email:</span>
                    {editMode ? (
                        <>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border rounded px-2 py-1 w-2/3"
                            />
                            <button onClick={requestEmailVerification} className="bg-blue-500 text-white px-3 py-1 rounded text-sm ml-2">Verify</button>
                        </>
                    ) : (
                        <span className="text-gray-800 font-medium">{formData.email}</span>
                    )}
                </div>

                <div className="flex items-center justify-between border-b pb-2 mb-4">
                    <span className="text-gray-600">Phone:</span>
                    {editMode ? (
                        <>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border rounded px-2 py-1 w-2/3" />
                            {otpSent ? (
                                <>
                                    <input type="text" placeholder="Enter OTP" value={phoneOTP} onChange={(e) => setPhoneOTP(e.target.value)} className="border rounded px-2 py-1 w-1/3 ml-2" />
                                    <button onClick={verifyOTP} className="bg-green-500 text-white px-3 py-1 rounded text-sm ml-2">Verify</button>
                                </>
                            ) : (
                                <button onClick={requestPhoneOTP} className="bg-blue-500 text-white px-3 py-1 rounded text-sm ml-2">Send OTP</button>
                            )}
                        </>
                    ) : (
                        <span className="text-gray-800 font-medium">{formData.phone || 'N/A'}</span>
                    )}
                </div>

            </div>
            { error && <p className='text-red-600'>Email Already linked to another account or Something went wrong, Please try again later.</p>}
            {/* Edit / Save Buttons */}
            <div className="flex justify-center space-x-4 mt-6">
                {editMode ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
                        >
                            {loading ? (<>Loading...</>):  (<><HiCheck className="mr-2" /> Save</>)}
                           
                        </button>
                        <button
                            onClick={() => {
                                dispatch(clearError())
                                setEditMode(false)
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                        >
                            <HiX className="mr-2" /> Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                    >
                        <HiPencil className="mr-2" /> Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProfilePage