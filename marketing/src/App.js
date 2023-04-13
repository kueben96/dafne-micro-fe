import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Button } from '@mui/material'

const App = ({ onAuthClicked }) => {
    return (
        <div>
            <h1>Marketing App</h1>
            {/* Communicate back to Container/parent */}
            <Button onClick={onAuthClicked}>auth</Button>
            <Link to='/contribute'>Contribute</Link>
            <Link to='/about'>About</Link>
            <Link to='/documentation'>Documentation</Link>
            <Outlet />
        </div>
    )
}

export default App