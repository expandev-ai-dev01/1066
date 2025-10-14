import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '../assets/styles/globals.css';

/**
 * @entrypoint Application Entry Point
 * @summary Main application entry point that initializes React and renders the root component
 * @type application-bootstrap
 * @category core
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
