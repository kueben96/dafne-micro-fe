import React from 'react'
import NavigationManager from '../components/NavigationManager'
import { Outlet, useRoutes } from 'react-router-dom';
import App from '../App';

export const routes = [
    {
        path: '/',
        element: (
            <>
                <NavigationManager >
                    <App />
                    <Outlet />
                </NavigationManager>

            </>
        ),
        children: [
            {
                path: 'contribute',
                element: <h2>Contribute</h2>,
            },
            {
                path: 'documentation',
                element: <h2>Documentation</h2>,
            },
            {
                path: 'about',
                element: <h2>About</h2>,
            },
        ],
    },
];