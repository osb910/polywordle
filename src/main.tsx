import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {L10nProvider} from './components/Localizer/use-localizer.tsx';
import {GameProvider} from './components/Game/game-context.tsx';
import GlobalStyles from './components/GlobalStyles.tsx';
import App from './App.tsx';
import {ToastProvider} from './components/Toaster/use-toaster.tsx';
import {SoundProvider} from './components/SoundToggler/sound-enabled.tsx';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
  <StrictMode>
    <L10nProvider>
      <SoundProvider>
        <ToastProvider>
          <GameProvider>
            <GlobalStyles />
            <App />
          </GameProvider>
        </ToastProvider>
      </SoundProvider>
    </L10nProvider>
  </StrictMode>
);
