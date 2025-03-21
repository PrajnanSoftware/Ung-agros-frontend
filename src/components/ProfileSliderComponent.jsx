import React from 'react'
import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/userSlice';
import { getCart } from '../redux/slice/cartSlice';

const ProfileSliderComponent = ({handleToggle}) => {
    const { error, loading, isAuthenticated, success, user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);
      handleToggle();
    };

    const handleLogout = async () => {
        await dispatch(logout()).unwrap();
        dispatch(getCart());
        handleToggle(); 
        navigate('/login'); 
      };

  return (
    <div className=' h-screen w-full inset-0 z-50 bg-transparent fixed' onClick={(handleToggle)}>
        <div className='w-[300px] h-full bg-white fixed right-0 top-0 shadow-lg p-4 transition-transform duration-300 flex flex-col justify-between overflow-y-auto' onClick={(e) => e.stopPropagation()} >
            <button className="absolute top-4 right-4 text-xl" onClick={handleToggle}>
                <HiX />
            </button>
            <div className='flex-1'>
                <h2 className="text-lg font-bold">Profile</h2>
                <div className='w-28 h-28 text-center m-auto rounded-full bg-gray-200 font-bold border text-5xl text-primary flex justify-center items-center'>
                {(user?.email)?.charAt(0).toUpperCase()}
                </div>
                <div className="mt-6 space-y-4">
                    <button
                        className="w-full text-left text-lg font-semibold text-gray-700 hover:text-primary hover:bg-gray-100 px-4 py-2 rounded"
                        onClick={() => handleNavigation('/profile')}
                    >
                        Profile
                    </button>
                    <button
                        className="w-full text-left text-lg font-semibold text-gray-700 hover:text-primary hover:bg-gray-100 px-4 py-2 rounded"
                        onClick={() => handleNavigation('/my-orders')}
                    >
                        My Orders
                    </button>
                </div>
            </div>
                    {/* Logout Button */}
            <div className='absolute bottom-2 left-2 right-2'> 
                    <button
                className=" w-full text-center text-lg font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-3 rounded"
                  onClick={handleLogout}
                >
                Logout
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProfileSliderComponent