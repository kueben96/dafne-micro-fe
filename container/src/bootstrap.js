import React from 'react'
import ReactDOM from 'react-dom'
import { routes } from './routing/routes'
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom'
import App from './App';

const router = createBrowserRouter(routes);

ReactDOM.render(

    <BrowserRouter><App /></BrowserRouter>
    ,
    document.querySelector('#root')
)

