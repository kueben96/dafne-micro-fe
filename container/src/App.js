import React, { lazy } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'

const App = () => {

    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    const DaFneLazy = lazy(() => import('./components/DafneApp'))
    const AuthLazy = lazy(() => import('./components/AuthApp'))

    const navigate = useNavigate()
    const location = useLocation()
    console.log("location")
    console.log(location)


    const renderMFE = (MFE) => {
        return (
            <React.Suspense fallback="Loading...">
                <MFE onAuthClicked={navigateAuth} onNavigateBackToShell={navigateBackToShell} />
            </React.Suspense>
        )
    }
    // TODO: handle generic navigation to paths (navigateToParentPath("/auth"))
    const navigateAuth = () => {
        navigate('/auth')
    }
    const navigateBackToShell = () => {
        console.log("fire onNavigateBackToShell")
        navigate('/')
    }
    return (
        <>
            <Link to="/auth">auth</Link>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to={"/marketing"} />} />
                    <Route path="/marketing/*" element={renderMFE(MarketingLazy)} />
                    <Route path="/auth/*" element={renderMFE(AuthLazy)}>

                    </Route>
                    <Route path="/dafne" element={renderMFE(DaFneLazy)} />
                </Route>
            </Routes>
        </>
    )
}
export default App

