import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { defaultConfig } from './config';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

for (const [key, value] of Object.entries(defaultConfig.globalColors)) {
  document.documentElement.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App initialConfig={defaultConfig} />
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}


