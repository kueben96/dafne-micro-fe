import React from 'react'
import App from '../App'
import NavigationManager from '../components/NavigationManager'

export const routes = (onNavigateOnShell) => {
    return (
        [
            {
                path: "/",
                element: (
                    <>
                        <NavigationManager>
                            <App onNavigateOnShell={onNavigateOnShell} />
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