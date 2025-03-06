import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const protectedRoute = ({ children }) => {
    const { isAuthenticated, initialized } = useSelector((state) => state.user);
    const location = useLocation();
    if (!initialized) return <div>Loading...</div>;
    return isAuthenticated ? children : <Navigate to='/login' state={{ from: location }} replace />
}

export default protectedRoute;