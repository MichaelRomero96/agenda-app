import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const myVar = 5;
const myVar2 = 10;
for (let i; myVar > i; i++)
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
