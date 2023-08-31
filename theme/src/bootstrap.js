import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('_theme-dev-root');
const root = createRoot(container);

root.render(
    <App />
)
