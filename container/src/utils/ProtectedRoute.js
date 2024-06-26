import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/auth/login" replace state={{ from: location }} />
    }
    return children;
}

export default ProtectedRoute