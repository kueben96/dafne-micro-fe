import React from 'react'
import App from '../App'
import NavigationManager from '../components/NavigationManager'

export const routes = (onNavigateBackToShell) => {
    return (
        [
            {
                path: "/",
                element: (
                    <>
                        <NavigationManager>
                            <App onNavigateBackToShell={onNavigateBackToShell} />
                        </NavigationManager>
                    </>
                ),
                children: [
                    {
                        index: true,
                        element: <App />,
                    },
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
    )
} 