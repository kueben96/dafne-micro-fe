import React, { useState } from 'react'

import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import { Routes, Route, Navigate, BrowserRouter, useNavigate } from 'react-router-dom'
import AuthPageLayout from './components/AuthPageLayout'

const LoginPage = ({ onToggleMode, isLoginMode }) => (
    <AuthPageLayout isLoginMode={isLoginMode} onToggleMode={onToggleMode}>
        <LoginForm />
    </AuthPageLayout>
)
const SignupPage = ({ onToggleMode, isLoginMode }) => (
    <AuthPageLayout isLoginMode={isLoginMode} onToggleMode={onToggleMode}>
        <RegistrationForm />
    </AuthPageLayout>
);

const App = () => {

    const [isLoginMode, setIsLoginMode] = useState(true);
    const navigate = useNavigate();
    console.log("isLoginMode")
    console.log(isLoginMode)


    const handleToggleMode = () => {
        setIsLoginMode(!isLoginMode);
        if (isLoginMode === true) {
            navigate('/auth/signup');
        } else {
            navigate('/auth/login');
        }
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace />} />
                <Route path="/auth/login" element={<LoginPage isLoginMode={isLoginMode} onToggleMode={handleToggleMode} />} />
                <Route path="/auth/signup" element={<SignupPage isLoginMode={isLoginMode} onToggleMode={handleToggleMode} />} />
            </Routes>
        </>
    )
}

export default App
