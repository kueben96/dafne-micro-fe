import React, { lazy } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { marketingRoutingPrefix, authRoutingPrefix, dafneRoutingPrefix } from './constants'
import { Container, useMyHistory } from './utils/MyHistoryProvider'
import { useRef, useEffect } from 'react'


const App = () => {
    // TODO: if authenticated, then navigate index to dafne
    // TODO: if logout clicked, then navigate index to marketing
    // TODO: if logout clicked, the token gets removed

    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    const DaFneLazy = lazy(() => import('./components/DafneApp'))
    const AuthLazy = lazy(() => import('./components/AuthApp'))

    const navigate = useNavigate()
    const location = useLocation()

    // TODO: handle more generic navigation
    window.addEventListener("[external] navigated",
        (event) => {
            navigate(event.detail)
        });
    window.addEventListener("jwtReceived",
        (event) => {

            console.log(event.detail);
            navigate('/dafne')
        });
    window.addEventListener("userLogout",
        () => {
            navigate('/marketing')
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
            <Routes>
                <Route index element={<Navigate to={"/marketing/"} />} />
                <Route path="/marketing/*" element={renderMFE(MarketingLazy)} />
                <Route path="/auth/*" element={renderMFE(AuthLazy)}>
                </Route>
                <Route path="/dafne/*" element={renderMFE(DaFneLazy)} />
                {/* </Route> */}
            </Routes>
        </>
    )
}
export default App

