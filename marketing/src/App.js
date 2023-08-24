import React, { lazy } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
// import { MyButton } from "landing";

const App = () => {
    const MyButton = lazy(() => import('landing/Button'));
    const ServicesCard = lazy(() => import('landing/ServicesCard'));
    // TODO: implement more generic navigation
    // TODO: navigateToOtherMicroFrontend("/auth")
    // TODO: is there a solution to retrieve these functions from shell? 
    const navigateToAuthApp = () => {
        window.dispatchEvent(
            new CustomEvent("[external] navigated",
                { detail: '/auth/login' })
        );
    }

    const handleClick = () => {
        console.log("clicked next button")
    }
    return (
        <div>
            <h1>Marketing App</h1>
            <React.Suspense fallback="Loading...">
                <ServicesCard />
            </React.Suspense>
            {/* Communicate back to Container/parent */}
            <React.Suspense fallback="Loading...">
                <MyButton onClick={handleClick} />
            </React.Suspense>
            <Button onClick={navigateToAuthApp}>auth</Button>
            <Link to='/contribute'>Contribute</Link>
            <Link to='/about'>About</Link>
            <Link to='/documentation'>Documentation</Link>
            <Outlet />
        </div>
    )
}

export default App