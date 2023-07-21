import React, { useRef, useEffect } from "react";
import { mount } from "dafne/DafneApp";
import { useNavigate, useLocation } from 'react-router-dom'
import { dafneRoutingPrefix } from "../constants";

const DafneApp = () => {
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();


    // listens for navigation events and updates the location object accordingly
    useEffect(() => {
        const dafneAppNavigationHandler = (event) => {
            const pathname = event.detail;
            const newPathname = `${dafneRoutingPrefix}${pathname}`
            if (newPathname === location.pathname) {
                return;
            }
            navigate(newPathname);

        }
        window.addEventListener("[dafne] navigated", dafneAppNavigationHandler);

        return () => {
            window.removeEventListener(
                "[dafne] navigated",
                dafneAppNavigationHandler
            )
        }
    }, [location]);

    // listens for location changes in the shell and dispatches notification to dafne app if the location starts with dafneBaseName
    useEffect(() => {
        if (location.pathname.startsWith(dafneRoutingPrefix)) {
            window.dispatchEvent(
                new CustomEvent("[shell] navigated", {
                    detail: location.pathname.replace(dafneRoutingPrefix, ""),
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
            initialPathname: location.pathname.replace(dafneRoutingPrefix, ""),
            routingStrategy: "memory",
        });
        isFirstRunRef.current = false;
    }, [location]);

    useEffect(() => unmountRef.current, []);
    return (

        <div ref={wrapperRef} id="dafne-mfe" />
    )
}

export default DafneApp