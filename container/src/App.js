import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const App = () => {

    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    const DaFneLazy = lazy(() => import('./components/DafneApp'))
    const AuthLazy = lazy(() => import('./components/AuthApp'))

    const renderMFE = (MFE) => {
        return (
            <React.Suspense fallback="Loading...">
                <MFE />
            </React.Suspense>
        )
    }
    return (
        <>
            <Routes>
                <Route path="*" element={renderMFE(MarketingLazy)} ></Route>
                <Route path="/auth/*" element={renderMFE(AuthLazy)} />
                <Route path="/dafne" element={renderMFE(DaFneLazy)} />
            </Routes>
        </>
    )
}
export default App