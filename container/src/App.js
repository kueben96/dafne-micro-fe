import React, { lazy, useContext } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useLocation, BrowserRouter } from 'react-router-dom'
import { marketingRoutingPrefix, authRoutingPrefix, dafneRoutingPrefix } from './constants'
import { AuthContext, AuthProvider, useAuth } from './utils/AuthProvider'


const App = () => {
    // TODO: if authenticated, then navigate index to dafne
    // TODO: if logout clicked, then navigate index to marketing
    // TODO: if logout clicked, the token gets removed

    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    const DaFneLazy = lazy(() => import('./components/DafneApp'))
    const AuthLazy = lazy(() => import('./components/AuthApp'))

    const navigate = useNavigate()
    const location = useLocation()
    const { token, onLogin, onLogout } = useAuth();

    // TODO: handle more generic navigation
    window.addEventListener("[external] navigated",
        (event) => {
            navigate(event.detail)
        });

    window.addEventListener('jwtReceived', onLogin);
    window.addEventListener('userLogout', onLogout);

    const renderMFE = (MFE) => {
        return (
            <React.Suspense fallback="Loading...">
                <MFE />
            </React.Suspense>
        )
    }
    // TODO: handle generic navigation to paths (navigateToParentPath("/auth"))

    return (

        <>
            <Routes>
                <Route index element={<Navigate to={"/marketing/"} />} />
                <Route path="/marketing/*" element={renderMFE(MarketingLazy)} />
                <Route path="/auth/*" element={renderMFE(AuthLazy)} />
                <Route path="/dafne/*" element={renderMFE(DaFneLazy)} />
            </Routes>
        </>

    )
}
export default App

