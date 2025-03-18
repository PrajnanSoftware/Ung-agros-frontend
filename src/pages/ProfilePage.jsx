import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HiPencil, HiCheck, HiX } from 'react-icons/hi'; // Icons for edit/cancel
import { clearError, getUserAddress, updateUser, updateUserAddress } from '../redux/slice/userSlice';
import { countBy } from 'lodash';
import AddressFormComponent from '../components/AddressFormComponent';
import ModalComponent from '../components/ModalComponent';
import { toast } from 'react-toastify';
import { axiosInstance } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error, userAddress, addressError, isAuthenticated } = useSelector((state) => state.user);
    const [editMode, setEditMode] = useState(false);
    const [openAddressForm, setOpenAddressForm] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    

    const [ emailSent, setEmailSent] = useState(false);
    const [phoneOtp, setPhoneOtp] = useState('');
    const [ otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);


    const requestPhoneOTP = async () => {
        try {
            // const response = await axiosInstance.post('/users/generateOTP', {email:formData.email, type: 'email'});
            if (true) {
                toast.success('OTP sent successfully')
                setOtpSent(true);
                console.log('OTP sent to new phone number.');
            }
        } catch (error) {
            toast.error('Something went wrong');
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
                dispatch(getUserAddress()).unwrap()
            } else {
                navigate('/login')
            }
        }, [dispatch, user]);


    useEffect(() => {
        if (user) {
            setFormData(prevFormData => ({
                ...prevFormData, 
                name: user.name || prevFormData.name || '',
                email: user.email || prevFormData.email || '',
                phone: user.phone || prevFormData.phone || '',
            }));
        }
    }, [user]);

    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressToggle = () => setOpenAddressForm(prev => !prev) 

    const handleSave = async () => {
        // if (!verified && formData.phone !== user.phone) {
        //     alert('Please verify your phone number before saving.');
        //     return;
        // }
        try {
            // const response = await axiosInstance.put('/user/profile', formData);
            const response = await dispatch(updateUser(formData)).unwrap();
            setEditMode(false);
            console.log('Profile updated successfully.');
        } catch (error) {
            console.error('Update failed:', error.response?.data);
        }
    };


    return (
        <div className='my-10'>
            <div className={`max-w-lg mx-auto mt-10 bg-white rounded-lg p-6 ${editMode ? 'border-2 shadow-2xl' : 'border shadow-lg'}`}>
                <h2 className="text-2xl font-semibold text-gray-700 text-center">My Profile</h2>
                <div className='relative'>
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
                                    {/* <button onClick={requestEmailVerification} className="bg-blue-500 text-white px-3 py-1 rounded text-sm ml-2">Verify</button> */}
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
                            <></>
                            // <button
                            //     onClick={() => setEditMode(true)}
                            //     className="absolute -top-12 right-0 bg-blue-500 text-white px-2 text-center py-2 rounded-full flex items-center"
                            // >
                            //     <HiPencil className="" />
                            // </button>
                        )}
                    </div>
                </div>
            </div>
            <div className={`relative max-w-lg mx-auto mt-10 bg-white rounded-lg p-6 border shadow-lg`}>
                <h3 className='text-xl font-semibold text-gray-700'>Address</h3>

                {userAddress ? (
                    <>
                        <button
                            onClick={handleAddressToggle}
                            className="absolute top-6 right-6 bg-blue-500 text-white px-2 text-center py-2 rounded-full flex items-center"
                        >
                            <HiPencil />
                        </button>

                        <div>
                            {`${userAddress.fullName}`},
                            <br />
                            {`${userAddress.phoneNumber}`}
                            <br />
                            {`${userAddress.buildingName}, ${userAddress.street}, ${userAddress?.landmark}, ${userAddress.city}, ${userAddress.state}, ${userAddress.country} - ${userAddress.zipCode}`}
                        
                        </div>
                        <ModalComponent isOpen={openAddressForm} handleClose={handleAddressToggle}>
                            <AddressFormComponent address={userAddress} togglePopup={handleAddressToggle}/>
                        </ModalComponent>
                    </>
                ) : (
                    !openAddressForm ? <button
                        onClick={() => setOpenAddressForm(true)}
                        className="bg-blue-500 text-white px-2 text-center py-1 mt-2 rounded flex items-center"
                    >
                        Add address
                    </button> : 
                    <ModalComponent isOpen={openAddressForm} handleClose={handleAddressToggle}>
                        <AddressFormComponent togglePopup={handleAddressToggle}/>
                    </ModalComponent>

                )}
            </div>
        </div>
    );
}

export default ProfilePage