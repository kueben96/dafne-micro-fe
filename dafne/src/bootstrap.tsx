import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// mount function to start up the app

const mount = (el: HTMLElement) => {
    ReactDOM.render(
        <BrowserRouter>
            <App></App>
        </BrowserRouter>,
        el
    );
};

export { mount };
