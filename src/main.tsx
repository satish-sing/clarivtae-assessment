import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import App from './App';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <App />
  </AppProvider>
);
