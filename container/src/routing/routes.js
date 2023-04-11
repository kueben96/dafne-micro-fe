import React from 'react'
import App from '../App'

export const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: 'auth',
                element: <App />,
            },
            {
                path: 'dafne',
                element: <App />,
            }
        ]
    },
]