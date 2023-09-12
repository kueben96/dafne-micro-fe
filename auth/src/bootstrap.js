import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './routing/router-factory'
import ReactDOM from 'react-dom'


// mount functin to start up the app
const mount = ({
    mountPoint,
    initialPathname,
    routingStrategy,
} = {}) => {
    const router = createRouter({
        strategy: routingStrategy || 'browser',
        initialPathname: initialPathname || '/',
    })

    ReactDOM.render(
        <RouterProvider router={router} />,
        mountPoint
    )
    return () => queueMicrotask(() => ReactDOM.unmountComponentAtNode(mountPoint));
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