import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
import { useNavigate, useLocation } from 'react-router-dom'
import { marketingRoutingPrefix } from "../utils/constants";

const MarketingApp = () => {
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();


    // listens for navigation events and updates the location object accordingly
    useEffect(() => {
        const marketingAppNavigationHandler = (event) => {
            const pathname = event.detail;
            const newPathname = `${marketingRoutingPrefix}${pathname}`
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
        if (location.pathname.startsWith(marketingRoutingPrefix)) {
            window.dispatchEvent(
                new CustomEvent("[shell] navigated", {
                    detail: location.pathname.replace(marketingRoutingPrefix, ""),
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
            initialPathname: location.pathname.replace(marketingRoutingPrefix, ""),
            routingStrategy: "memory",
        });
        isFirstRunRef.current = false;
    }, [location]);

    useEffect(() => unmountRef.current, []);
    return (
        <div ref={wrapperRef} id="marketing-mfe" />
    )
}

export default MarketingApp