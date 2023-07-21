import React, { useState, useEffect } from 'react'

import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import { Routes, Route, Navigate, BrowserRouter, useNavigate } from 'react-router-dom'
import AuthPageLayout from './components/AuthPageLayout'


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
        <>

            <Routes >
                <Route path="/">
                    <Route index element={<Navigate to={"/login"} />} />
                    <Route path="/login" element={<LoginPage isLoginMode={isLoginMode} onToggleMode={handleToggleMode} />} />
                    <Route path="/signup" element={<SignupPage isLoginMode={isLoginMode} onToggleMode={handleToggleMode} />} />
                </Route>
            </Routes>

        </>
    )
}

export default App


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