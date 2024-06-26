import React, { useRef, useEffect } from "react";
import { mount } from "auth/AuthApp";
import { useNavigate, useLocation } from 'react-router-dom'

const authBaseName = '/auth'

const AuthApp = () => {
    // TODO: handle back navigation from auth to main page 
    // TODO: problem: Router navigates back to /auth and /auth automatically navigates to /auth/login
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // listens for navigation events and updates the location object accordingly
    useEffect(() => {

        const authAppNavigationHandler = (event) => {
            const pathname = event.detail;
            const newPathname = `${authBaseName}${pathname}`
            if (newPathname === location.pathname) {
                return;
            }
            navigate(newPathname);


        }
        window.addEventListener("[auth] navigated", authAppNavigationHandler);

        return () => {
            window.removeEventListener(
                "[auth] navigated",
                authAppNavigationHandler
            )
        }
    }, [location]);

    // listens for location changes in the shell and dispatches notification to auth app if the location starts with authBaseName
    useEffect(() => {

        if (location.pathname.startsWith(authBaseName)) {
            window.dispatchEvent(
                new CustomEvent("[shell] navigated", {
                    detail: location.pathname.replace(authBaseName, ""),
                })
            );
        }
    }, [location]);

    const isFirstRunRef = useRef(true);
    const unmountRef = useRef(() => { });
    useEffect(() => {
        if (!isFirstRunRef.current) {
            return;
        }

        unmountRef.current = mount({
            mountPoint: wrapperRef.current,
            initialPathname: location.pathname.replace(authBaseName, ""),
            routingStrategy: "memory",
        });
        isFirstRunRef.current = false;
    }, [location]);

    useEffect(() => unmountRef.current, []);
    return (
        <div ref={wrapperRef} id="auth-mfe" />
    )
}

export default AuthApp