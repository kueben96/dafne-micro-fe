import React, { useRef, useEffect } from "react";
import { mount } from "../../../auth/src/bootstrap";
import { useNavigate, useLocation } from 'react-router-dom'

const authBaseName = 'auth'

console.log("in auth app")
const AuthApp = () => {
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // listens for navigation events and updates the location object accordingly
    useEffect(() => {
        console.log("useEff1")
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

    // listens for location changes in the shell and dispatches notification to marketing app if the location starts with marketingBaseName
    useEffect(() => {
        console.log("useEff2")
        console.log(location.pathname)
        if (location.pathname.startsWith(authBaseName)) {
            console.log("trueee")
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
        console.log(wrapperRef)
        let loc = location.pathname
        console.log("loc")
        console.log(loc)
        unmountRef.current = mount({
            mountPoint: wrapperRef.current,
            initialPathname: location.pathname.replace(authBaseName, ""),
        });
        isFirstRunRef.current = false;
    }, [location]);

    useEffect(() => unmountRef.current, []);
    return (
        <div ref={wrapperRef} id="auth-mfe" />
    )
}

export default AuthApp