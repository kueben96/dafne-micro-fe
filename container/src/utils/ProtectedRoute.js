import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth()

    if (!token) {
        return <Navigate to="/auth" replace />
    }
    return children;
}

export default ProtectedRoute