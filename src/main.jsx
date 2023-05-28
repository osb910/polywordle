import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './reset.css';
import {AppProvider} from './store/app-context.js';

createRoot(document.querySelector('#root')).render(
  <AppProvider>
    <App />
  </AppProvider>
);
