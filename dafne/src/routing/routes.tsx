import React from 'react';
import { NavigationManager } from '../utils/NavigationManager';
import DashboardPage from '../pages/DashboardPage';
import ReproductionPage from '../pages/ReproductionPage';
import AppInitializer from '../AppInitializer';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import Layout from '../Layout';

export const routes = [
    {
        path: "/",
        element: (
            <AppInitializer>
                <NavigationManager>
                    <Layout />
                </NavigationManager>
            </AppInitializer>
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
