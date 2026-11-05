// Ensure window.fetch has both getter and setter for third-party browser extensions
try {
  const currentFetch = window.fetch ? window.fetch.bind(window) : undefined;
  let activeFetch = currentFetch;
  const desc = Object.getOwnPropertyDescriptor(window, 'fetch');
  if (!desc || desc.set === undefined) {
    Object.defineProperty(window, 'fetch', {
      get: () => activeFetch,
      set: (fn) => {
        activeFetch = fn;
      },
      configurable: true,
      enumerable: true,
    });
  }
} catch (_) {
  // Ignore polyfill error in environments where window is sealed
}

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
