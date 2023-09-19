import React from 'react';
import { NavigationManager } from '../utils/NavigationManager';
import DashboardPage from '../pages/DashboardPage';
import ReproductionPage from '../pages/ReproductionPage';
import App from '../App';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

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
                element: <Navigate to={ROUTES.DASHBOARD.JOBS} />
            },
            {
                path: ROUTES.DASHBOARD.JOBS,
                element: <DashboardPage />
            },
            {
                path: ROUTES.METHODS.REPRODUCTION,
                element: <ReproductionPage />
            },
        ],
    },
];
