import React from 'react'
import { Outlet, Link } from 'react-router-dom'
const Layout = () => {
    const dafneRoutingPrefix = "dafne"
    const authRoutingPrefix = "auth"
    const marketingRoutingPrefix = "marketing"
    return (
        <>
            <nav style={{ marginBottom: "3rem" }}>
                <Link to={`/${marketingRoutingPrefix}`}>Marketing</Link>
                <Link to={`/${authRoutingPrefix}`}>Auth</Link>
                <Link to={`/${dafneRoutingPrefix}`}>Dafne</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout