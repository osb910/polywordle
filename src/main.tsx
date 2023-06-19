import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {AppProvider} from './context/app-context.tsx';
import {GameProvider} from './context/game-context.tsx';
import GlobalReset from './components/GlobalStyles.tsx';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
  <StrictMode>
    <AppProvider>
      <GameProvider>
        <GlobalReset />
        <App />
      </GameProvider>
    </AppProvider>
  </StrictMode>
);
