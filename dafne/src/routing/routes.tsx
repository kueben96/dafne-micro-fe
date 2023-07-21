import React from 'react';
import { Outlet } from "react-router-dom";
import { NavigationManager } from '../utils/NavigationManager';
import DashboardPage from '../pages/DashboardPage';
import ReproductionPage from '../pages/ReproductionPage';
import App from '../App';

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
                element: <DashboardPage />
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
