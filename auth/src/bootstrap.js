import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './routing/router-factory'
import { createRoot } from 'react-dom/client';

// mount functin to start up the app
const mount = ({
    mountPoint,
    initialPathname,
    routingStrategy,
} = {}) => {
    const root = createRoot(mountPoint);
    const router = createRouter({
        strategy: routingStrategy || 'browser',
        initialPathname: initialPathname || '/',
    })

    root.render(
        <RouterProvider router={router} />
    )
    return () => queueMicrotask(() => root.unmount());
}
// if in dev or isolation -> call mount immediately 

if (process.env.NODE_ENV == 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');


    if (devRoot) {
        mount({ mountPoint: devRoot, routingStrategy: 'browser' });
    }
}

// else: export the mount function if running through container

export { mount };