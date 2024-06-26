import React from 'react';
import { createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

// see here for more info on auth context
// https://www.robinwieruch.de/react-router-authentication/

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (event) => {
        setToken(event.detail)
        if (location.state) {

            navigate(location.state?.from?.pathname)
        }
        const origin = location.state?.from?.pathname || '/dafne'
        navigate(origin)
    }

    const handleLogout = () => {
        setToken(null)
        navigate('/marketing')
    }

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return React.useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuth }