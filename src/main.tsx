import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {LangProvider} from './context/lang-context.tsx';
import {GameProvider} from './context/game-context.tsx';
import GlobalStyles from './components/GlobalStyles.tsx';
import App from './App.tsx';
import {ToastProvider} from './components/Toaster/use-toaster.tsx';
import {SoundProvider} from './components/SoundToggler/sound-enabled.tsx';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
  <StrictMode>
    <LangProvider>
      <SoundProvider>
        <ToastProvider>
          <GameProvider>
            <GlobalStyles />
            <App />
          </GameProvider>
        </ToastProvider>
      </SoundProvider>
    </LangProvider>
  </StrictMode>
);
