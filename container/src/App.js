import React, { lazy } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { marketingRoutingPrefix, authRoutingPrefix, dafneRoutingPrefix } from './constants'
import { Container, useMyHistory } from './utils/MyHistoryProvider'
import { useRef, useEffect } from 'react'


const App = () => {
    // TODO: if authenticated, then navigate index to dafne

    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    const DaFneLazy = lazy(() => import('./components/DafneApp'))
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
    window.addEventListener("jwtReceived",
        (event) => {

            console.log(event.detail);
            navigate('/dafne')
        });

    const renderMFE = (MFE) => {
        return (
            <React.Suspense fallback="Loading...">
                <MFE />
            </React.Suspense>
        )
    }
    // TODO: handle generic navigation to paths (navigateToParentPath("/auth"))
    const { myHistory } = useMyHistory();

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
                <Route path="/dafne" element={renderMFE(DaFneLazy)} />
                {/* </Route> */}
            </Routes>
        </>
    )
}
export default App

