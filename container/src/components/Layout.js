import React from 'react'
import { dafneRoutingPrefix, authRoutingPrefix, marketingRoutingPrefix } from '../routing/constants'
import { Outlet, Link } from 'react-router-dom'
const Layout = () => {
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