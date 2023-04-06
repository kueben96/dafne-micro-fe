import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: 'auth',
                element: <App />,
            },
            {
                path: 'dafne',
                element: <App />,
            }
        ]
    },
]);

console.log("router")
console.log(router)

ReactDOM.render(

    <RouterProvider router={router} />
    ,
    document.querySelector('#root')
)

