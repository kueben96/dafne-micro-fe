import React, { lazy } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { marketingRoutingPrefix, authRoutingPrefix, dafneRoutingPrefix } from './constants'
import { Container, useMyHistory } from './utils/MyHistoryProvider'
import { useRef, useEffect } from 'react'


const App = () => {
    // TODO: if authenticated, then navigate index to dafne

    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    // const DaFneLazy = lazy(() => import('./components/DafneApp'))
    const AuthLazy = lazy(() => import('./components/AuthApp'))

    const navigate = useNavigate()
    const location = useLocation()
    // TODO: handle routing
    // TODO: handle more generic navigation
    window.addEventListener("[external] navigated",
        (event) => {
            console.log("EXTERNAL NAVIGATED EVENT");
            console.log(event.detail);
            navigate(event.detail)
        });

    const renderMFE = (MFE) => {
        return (
            <React.Suspense fallback="Loading...">
                <MFE />
            </React.Suspense>
        )
    }
    // TODO: handle generic navigation to paths (navigateToParentPath("/auth"))
    // Concern: How readable and understandable is this approach?
    const prevLocationRef = useRef(null);
    const previousLocationsRef = useRef([]);


    // useEffect(() => {
    //     // Update the previous location whenever the location changes

    //     console.log("*****useEffect")
    //     prevLocationRef.current = location;

    //     previousLocationsRef.current.push(location);
    //     // console.log("previousLocationsRef.current")
    //     console.log(previousLocationsRef.current)
    // }, [location]);

    // const handleBackNavigation = () => {
    //     console.log("*****handleBackNavigation")
    //     // // Check if there's a previous location in the custom history stack
    //     if (prevLocationRef.current) {
    //         // Navigate back to the previous location using the custom history
    //         // navigate(prevLocationRef.current.pathname);
    //         console.log("test")
    //         console.log(previousLocationsRef.current)
    //         navigate(previousLocationsRef.current[0].pathname);
    //     } else {
    //         // If there's no previous location, use the default navigate function
    //         navigate(-1);
    //     }
    // };

    // useEffect(() => {
    //     // Add a listener to handle browser's back button navigation
    //     window.addEventListener('popstate', handleBackNavigation);

    //     // Clean up the listener when the component unmounts
    //     return () => window.removeEventListener('popstate', handleBackNavigation);
    // }, [navigate]);

    const { myHistory } = useMyHistory();
    // console.log("myHistory")
    // console.log(myHistory)

    // console.log("window.location")
    // console.log(window.location.pathname)

    return (
        <>
            <nav style={{ marginBottom: "3rem" }}>
                <Link to={`${marketingRoutingPrefix}`}>Marketing</Link>
                <Link to={`${authRoutingPrefix}`}>Auth</Link>
                <Link to={`${dafneRoutingPrefix}`}>Dafne</Link>
            </nav>
            <Routes>
                {/* <Route path="/" element={<Container />}> */}

                <Route index element={<Navigate to={"/marketing/"} />} />
                <Route path="/marketing/*" element={renderMFE(MarketingLazy)} />
                <Route path="/auth/*" element={renderMFE(AuthLazy)}>
                </Route>
                {/* <Route path="/dafne" element={renderMFE(DaFneLazy)} /> */}
                {/* </Route> */}
            </Routes>
        </>
    )
}
export default App

