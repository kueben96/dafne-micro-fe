import React, { lazy } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './utils/AuthProvider'
import ProtectedRoute from './utils/ProtectedRoute'
import MicroFrontendErrorBoundary from './utils/MicroFrontendErrorBoundary'

const App = () => {
    // TODO: if authenticated, then navigate index to dafne
    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    const DaFneLazy = lazy(() => import('./components/DafneApp'))
    const AuthLazy = lazy(() => import('./components/AuthApp'))
    // TODO: render whole nextJS vertical split app for landing page
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
            <MicroFrontendErrorBoundary>
                <React.Suspense fallback="Loading...">
                    <MFE />
                </React.Suspense>
            </MicroFrontendErrorBoundary>
        )
    }

    return (
        <>
            <Routes>
                <Route index element={<Navigate to={"/marketing"} />} />
                <Route path="/marketing/*" element={renderMFE(MarketingLazy)} />
                <Route path="/auth/*" element={renderMFE(AuthLazy)} />
                <Route path="/dafne/*" element={
                    <ProtectedRoute>
                        {renderMFE(DaFneLazy)}
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    )
}
export default App

