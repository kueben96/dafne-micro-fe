import React, { lazy, useContext } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useLocation, BrowserRouter } from 'react-router-dom'
import { marketingRoutingPrefix, authRoutingPrefix, dafneRoutingPrefix } from './utils/constants'
import { AuthContext, AuthProvider, useAuth } from './utils/AuthProvider'
import ProtectedRoute from './utils/ProtectedRoute'


const App = () => {
    // TODO: if authenticated, then navigate index to dafne

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

    return (
        <Routes>
            <Route index element={<Navigate to={"/marketing/"} />} />
            <Route path="/marketing/*" element={renderMFE(MarketingLazy)} />
            <Route path="/auth/*" element={renderMFE(AuthLazy)} />
            <Route path="/dafne/*" element={
                <ProtectedRoute>
                    {renderMFE(DaFneLazy)}
                </ProtectedRoute>
            } />
        </Routes>
    )
}
export default App

