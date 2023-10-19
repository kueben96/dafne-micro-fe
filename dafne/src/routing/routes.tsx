import React from 'react';
import { NavigationManager } from '../utils/NavigationManager';
import DashboardPage from '../pages/DashboardPage';
import ReproductionPage from '../pages/ReproductionPage';
import AppInitializer from '../AppInitializer';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import Layout from '../Layout';
import JobDetailPage from '../pages/DashboardPage/JobsView/JobDetailPage';
import DataViewComponent from '../pages/DashboardPage/DataView';
import JobsView from '../pages/DashboardPage/JobsView';
import NeigborhoodApp from '../pages/NeigborhoodApp';

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
                path: '/dashboard',
                element: <DashboardPage />,
                children: [
                    {
                        index: true,
                        element: <Navigate to='jobs' replace />,
                    },
                    {
                        path: 'models',
                        element: <h1>Models View</h1>
                    },
                    {
                        path: 'data',
                        element: <DataViewComponent />
                    },
                    {
                        path: 'jobs',
                        element: <JobsView />
                    },
                ]
            },
            {
                path: '/dashboard/jobs/:id',
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
            {
                path: 'neighborhood',
                element: <NeigborhoodApp />
            }
        ],
    },
];
