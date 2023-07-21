import React from 'react'
import { useEffect } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";


const myHistoryContext = createContext();

export function MyHistoryProvider({ children }) {
    const [myHistory, setMyHistory] = useState([]);

    const push = (location) => setMyHistory([...myHistory, location]);

    return (
        <myHistoryContext.Provider value={{ myHistory, push }}>
            {children}
        </myHistoryContext.Provider>
    );
}

export const useMyHistory = () => useContext(myHistoryContext);

export function Container() {
    const { push } = useMyHistory();
    const location = useLocation();

    useEffect(() => {
        push(location.pathname);
    }, [location]);

    return <Outlet />;
}
