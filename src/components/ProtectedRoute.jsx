import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import UnauthorizedPage from '../pages/UnauthorizedPage';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useSelector(state => state.user);

    console.log(isAuthenticated, user);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user?.role)) {
        return  <UnauthorizedPage />
    }

  return <Outlet />
}

export default ProtectedRoute