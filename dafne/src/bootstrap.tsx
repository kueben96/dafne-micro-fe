import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// mount function to start up the app

const mount = (el: HTMLElement) => {
    ReactDOM.render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>,
        el
    );
};

export { mount };
