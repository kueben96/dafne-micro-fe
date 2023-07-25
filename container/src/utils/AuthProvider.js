import React from 'react';
import { createContext, useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom'

// see here for more info on auth context
// https://www.robinwieruch.de/react-router-authentication/

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
    // const navigate = useNavigate();

    const handleLogin = (event) => {
        //TODO: implement login
        // setToken(event.detail)
        // navigate('/dafne')
    }

    const handleLogout = () => {
        //TODO: implement logout
        // setToken(null)
        // navigate('/marketing')
    }

    // window.addEventListener('jwtReceived', handleLogin);
    // window.addEventListener('userLogout', userLogoutListener);

    const value = {
        token,
        handleLogin,
        handleLogout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }