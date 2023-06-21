import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {LangProvider} from './context/lang-context.tsx';
import {GameProvider} from './context/game-context.tsx';
import GlobalReset from './components/GlobalStyles.tsx';
import App from './App.tsx';
import {ToastProvider} from './context/toast-context.tsx';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
  <StrictMode>
    <LangProvider>
      <ToastProvider>
        <GameProvider>
          <GlobalReset />
          <App />
        </GameProvider>
      </ToastProvider>
    </LangProvider>
  </StrictMode>
);
