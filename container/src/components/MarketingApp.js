import React, { useRef, useEffect } from "react";
import { mount } from "../../../marketing/src/bootstrap";
import { useNavigate, useLocation } from 'react-router-dom'

const marketingBaseName = '/marketing'

const MarketingApp = ({ onNavigateOnShell }) => {
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();


    // listens for navigation events and updates the location object accordingly
    useEffect(() => {
        const marketingAppNavigationHandler = (event) => {
            const pathname = event.detail;
            const newPathname = `${marketingBaseName}${pathname}`
            if (newPathname === location.pathname) {
                return;
            }
            navigate(newPathname);

        }
        window.addEventListener("[marketing] navigated", marketingAppNavigationHandler);

        return () => {
            window.removeEventListener(
                "[marketing] navigated",
                marketingAppNavigationHandler
            )
        }
    }, [location]);

    // listens for location changes in the shell and dispatches notification to marketing app if the location starts with marketingBaseName
    useEffect(() => {
        if (location.pathname.startsWith(marketingBaseName)) {
            window.dispatchEvent(
                new CustomEvent("[shell] navigated", {
                    detail: location.pathname.replace(marketingBaseName, ""),
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
            initialPathname: location.pathname.replace(marketingBaseName, ""),
            routingStrategy: "memory",
            onNavigateOnShell: onNavigateOnShell
        });
        isFirstRunRef.current = false;
    }, [location]);

    useEffect(() => unmountRef.current, []);
    return (

        <div ref={wrapperRef} id="marketing-mfe" />
    )
}

export default MarketingApp