import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/contribute" />
                <Route path="/about" />
                <Route path="/documentation" />
            </Routes>
            <h1>Marketing App</h1>
            {/* Communicate back to Container/parent */}
            <Link to='/auth'>Auth</Link>
            <Link to='/contribute'>Contribute</Link>
            <Link to='/about'>About</Link>
            <Link to='/documentation'>Documentation</Link>
        </div>
    )
}

export default App