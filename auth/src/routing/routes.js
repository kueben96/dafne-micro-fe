import React from 'react'
import App from '../App'

export const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/auth/login',
                element: <App />,
            },
            {
                path: '/auth/signup',
                element: <App />,
            }
        ]

    }
]