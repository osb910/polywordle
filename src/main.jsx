import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './reset.css';
import {AppProvider} from './lib/app-context.jsx';
import {GameProvider} from './lib/game-context.jsx';

createRoot(document.querySelector('#root')).render(
  <AppProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </AppProvider>
);
