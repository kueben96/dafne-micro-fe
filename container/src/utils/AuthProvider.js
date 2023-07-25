import { createContext, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');

    const handleLogin = () => {
        //TODO: implement login
    }

    const handleLogout = () => {
        //TODO: implement logout
    }

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