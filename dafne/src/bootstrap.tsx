import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { RoutingStrategy } from './routing/types';
import { createRoot } from 'react-dom/client';
import { createRouter } from './routing/router-factory';

// mount function to start up the app

const mount = ({
    mountPoint,
    initialPathname,
    routingStrategy,
}: {
    mountPoint: HTMLElement;
    initialPathname?: string;
    routingStrategy?: RoutingStrategy;
}) => {

    const root = createRoot(mountPoint);
    const router = createRouter({
        strategy: routingStrategy || 'browser',
        initialPathname: initialPathname || '/',
    })

    root.render(
        <RouterProvider router={router} />
    )
    return () => queueMicrotask(() => root.unmount(mountPoint));
};

if (process.env.NODE_ENV == 'development') {
    const devRoot = document.querySelector('#_dafne-dev-root') as HTMLElement;


    if (devRoot) {
        mount({ mountPoint: devRoot, routingStrategy: 'browser' });
    }
}
export { mount };
