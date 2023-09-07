import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { RoutingStrategy } from './routing/types';
import ReactDOM from 'react-dom';
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

    const router = createRouter({
        strategy: routingStrategy || 'browser',
        initialPathname: initialPathname || '/',
    })

    ReactDOM.render(
        <RouterProvider router={router} />,
        mountPoint
    )
    return () => queueMicrotask(() => ReactDOM.unmountComponentAtNode(mountPoint));
};

if (process.env.NODE_ENV == 'development') {
    const devRoot = document.querySelector('#_dafne-dev-root') as HTMLElement;


    if (devRoot) {
        mount({ mountPoint: devRoot, routingStrategy: 'browser' });
    }
}
export { mount };
