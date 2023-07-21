import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const App = () => {
    // TODO: implement more generic navigation
    // TODO: navigateToOtherMicroFrontend("/auth")
    // TODO: is there a solution to retrieve these functions from shell? 
    const navigateToAuthApp = () => {
        window.dispatchEvent(
            new CustomEvent("[external] navigated",
                { detail: '/auth/login' })
        );

    }
    return (
        <div>
            <h1>Marketing App</h1>
            {/* Communicate back to Container/parent */}
            <Button onClick={navigateToAuthApp}>auth</Button>
            <Link to='/contribute'>Contribute</Link>
            <Link to='/about'>About</Link>
            <Link to='/documentation'>Documentation</Link>
            <Outlet />
        </div>
    )
}

export default App