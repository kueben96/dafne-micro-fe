import React, { useState, useEffect } from 'react'


import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { ThemeProvider, useTheme } from '@mui/material'


const App = () => {

    const [isLoginMode, setIsLoginMode] = useState(true);
    const navigate = useNavigate();

    const handleToggleMode = () => {
        setIsLoginMode(!isLoginMode);
        if (isLoginMode === true) {
            navigate('/signup');
        } else {
            navigate('/login');
        }
    };

    return (
        // <ThemeProvider theme={theme}>
        <Routes >
            <Route index element={<Navigate to={"/login"} />} />
            <Route path="/login" element={<LoginPage isLoginMode={isLoginMode} onToggleMode={handleToggleMode} />} />
            <Route path="/signup" element={<SignupPage isLoginMode={isLoginMode} onToggleMode={handleToggleMode} />} />
        </Routes>
        // </ThemeProvider>
    )
}

export default App

import AuthPageLayout from './components/AuthPageLayout'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
export const LoginPage = ({ onToggleMode, isLoginMode }) => (
    <AuthPageLayout isLoginMode={isLoginMode} onToggleMode={onToggleMode} >
        <LoginForm />
    </AuthPageLayout>
)
export const SignupPage = ({ onToggleMode, isLoginMode }) => {

    return (
        <AuthPageLayout isLoginMode={isLoginMode} onToggleMode={onToggleMode}>
            <RegistrationForm />
        </AuthPageLayout>
    );
}