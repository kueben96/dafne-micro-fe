import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
// mount functin to start up the app



const mount = (el) => {
    ReactDOM.render(
        <MemoryRouter basename="/"> <App></App></MemoryRouter>
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