import React from 'react'
import App from '../App'
import NavigationManager from '../components/NavigationManager'

export const routes =
    [
        {
            path: "/",
            element: (
                <>
                    <NavigationManager>
                        <App />
                    </NavigationManager>
                </>
            ),
            children: [
                {
                    path: '/login',
                    element: <App />,
                },
                {
                    path: '/signup',
                    element: <App />,
                }
            ]

        }
    ]
