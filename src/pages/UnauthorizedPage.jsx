import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const UnauthorizedPage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized</h1>
          <p className="text-lg mt-2">You do not have permission to access this page.</p>
          {(isAuthenticated && user?.role === 'admin') ? 
            <Link to={"/dashboard"} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Go to Dashboard
            </Link>
            :
            <Link to={"/"} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Go to Home
            </Link>
          }
          
        </div>
  )
}

export default UnauthorizedPage