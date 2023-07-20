import React, { lazy } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { marketingRoutingPrefix, authRoutingPrefix, dafneRoutingPrefix } from './constants'


const App = () => {

    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    // const DaFneLazy = lazy(() => import('./components/DafneApp'))
    const AuthLazy = lazy(() => import('./components/AuthApp'))


    const navigate = useNavigate()
    const location = useLocation()
    // TODO: handle routing
    console.log("Location on container")
    console.log(location)

    const navigateOnShell = (path) => {
        navigate(path)
    }

    window.addEventListener("[external] navigated",
        (event) => {
            console.log("EXTERNAL NAVIGATED EVENT");
            console.log(event.detail);
            navigate(event.detail)
        });

    const renderMFE = (MFE) => {
        return (
            <React.Suspense fallback="Loading...">
                <MFE onNavigateOnShell={navigateOnShell} />
            </React.Suspense>
        )
    }
    // TODO: handle generic navigation to paths (navigateToParentPath("/auth"))
    // Concern: How readable and understandable is this approach?
    return (
        <>
            <nav style={{ marginBottom: "3rem" }}>
                <Link to={`${marketingRoutingPrefix}`}>Marketing</Link>
                <Link to={`${authRoutingPrefix}`}>Auth</Link>
                <Link to={`${dafneRoutingPrefix}`}>Dafne</Link>
            </nav>
            <Routes>
                <Route index element={<Navigate to={"/marketing"} />} />
                <Route path="/marketing/*" element={renderMFE(MarketingLazy)} />
                <Route path="/auth/*" element={renderMFE(AuthLazy)}>
                </Route>
                {/* <Route path="/dafne" element={renderMFE(DaFneLazy)} /> */}

            </Routes>
        </>
    )
}
export default App

