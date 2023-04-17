import React, { useState } from 'react'

import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import { Routes, Route, Navigate, BrowserRouter, useNavigate } from 'react-router-dom'
import AuthPageLayout from './components/AuthPageLayout'


const App = ({ onNavigateBackToShell }) => {

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
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<Navigate to={"/login"} />} />
                    <Route path="/login" element={<LoginPage isLoginMode={isLoginMode} onToggleMode={handleToggleMode} onNavigateBackToShell={onNavigateBackToShell} />} />
                    <Route path="/signup" element={<SignupPage isLoginMode={isLoginMode} onToggleMode={handleToggleMode} />} />
                </Route>
            </Routes>
        </>
    )
}

export default App


const LoginPage = ({ onToggleMode, isLoginMode, onNavigateBackToShell }) => (
    <AuthPageLayout isLoginMode={isLoginMode} onToggleMode={onToggleMode} onNavigateBackToShell={onNavigateBackToShell}>
        <LoginForm />
    </AuthPageLayout>
)
const SignupPage = ({ onToggleMode, isLoginMode, onNavigateBackToShell }) => {

    return (
        <AuthPageLayout isLoginMode={isLoginMode} onToggleMode={onToggleMode} onNavigateBackToShell={onNavigateBackToShell}>
            <RegistrationForm />
        </AuthPageLayout>
    );
}