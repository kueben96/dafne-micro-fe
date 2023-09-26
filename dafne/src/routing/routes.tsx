import React from 'react';
import { NavigationManager } from '../utils/NavigationManager';
import DashboardPage from '../pages/DashboardPage';
import ReproductionPage from '../pages/ReproductionPage';
import AppInitializer from '../AppInitializer';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import Layout from '../Layout';
import JobDetailPage from '../pages/DashboardPage/JobsView/JobDetailPage';

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
                element: <Navigate to={ROUTES.DASHBOARD.INDEX} />
            },
            {
                path: ROUTES.DASHBOARD.INDEX,
                element: <DashboardPage />
            },
            {
                path: ROUTES.DASHBOARD.MODELS,
                element: <DashboardPage />
            },
            {
                path: ROUTES.DASHBOARD.DATA,
                element: <DashboardPage />
            },
            {
                path: ROUTES.DASHBOARD.JOBS,
                element: <DashboardPage />
            },
            {
                path: ROUTES.DASHBOARD.JOB_DETAIL,
                element: <JobDetailPage />
            },
            {
                path: ROUTES.METHODS.REPRODUCTION,
                element: <ReproductionPage />
            },
            {
                path: ROUTES.METHODS.REPRODUCTION,
                element: <ReproductionPage />
            },
        ],
    },
];
