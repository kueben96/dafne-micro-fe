import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { routes } from './routing/routes.js'
import { BrowserRouter, MemoryRouter, createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom'
// mount functin to start up the app



const mount = (el) => {
    const browserRouter = createBrowserRouter(routes)
    // const memoryRouter = createMemoryRouter()

    ReactDOM.render(
        // sub apps memory history
        // <MemoryRouter basename="/"> <App></App></MemoryRouter>
        <RouterProvider router={browserRouter}><App /></RouterProvider>
        ,
        el
    )
}
// if in dev or isolation -> call mount immediately 

if (process.env.NODE_ENV == 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');

    if (devRoot) {
        mount(devRoot);
    }
}

// else: export the mount function if running through container

export { mount };