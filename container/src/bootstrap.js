import React from 'react'
import ReactDOM from 'react-dom'
import { routes } from './routing/routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(routes);

ReactDOM.render(

    <RouterProvider router={router} />
    ,
    document.querySelector('#root')
)

