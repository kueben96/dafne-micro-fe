import React from 'react';
import { NavigationManager } from '../utils/NavigationManager';
import DashboardPage from '../pages/DashboardPage';
import ReproductionPage from '../pages/ReproductionPage';
import App from '../App';
import { Navigate } from 'react-router-dom';

export const routes = [
    {
        path: "/",
        element: (
            <NavigationManager>
                <App />
            </NavigationManager>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard/processes" />
            },
            {
                path: "/dashboard/processes",
                element: <DashboardPage />
            },
            {
                path: "/methods/reproduction",
                element: <ReproductionPage />
            },
        ],
    },
];
