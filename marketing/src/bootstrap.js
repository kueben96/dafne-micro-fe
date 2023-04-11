import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routing/routes'

// mount functin to start up the app

const router = createBrowserRouter(routes);

const mount = (el) => {
    ReactDOM.render(
        <RouterProvider router={router} />,
        el
    )
}
// if in dev or isolation -> call mount immediately 

if (process.env.NODE_ENV == 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    if (devRoot) {
        mount(devRoot);
    }
}

// else: export the mount function if running through container

export { mount };