import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    // console.log("location protected route")
    // console.log(location)

    if (!token) {
        return <Navigate to="/auth/login" replace state={{ from: location }} />
    }
    return children;
}

export default ProtectedRoute