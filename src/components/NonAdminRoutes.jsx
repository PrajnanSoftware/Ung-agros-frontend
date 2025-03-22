import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const NonAdminRoutes = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    if (!isAuthenticated) {
        return <Outlet />;
    }
    
    if (user?.role === "admin") {
      return <Navigate to="/unauthorized" replace />;
    }
  
    return <Outlet />;
}

export default NonAdminRoutes