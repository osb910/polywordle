'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
// @ts-ignore
import useSound from 'use-sound';

export interface SoundContextProps {
  soundEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextProps>({
  soundEnabled: true,
  toggleSound: () => {},
});

export const SoundProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const storedValue = window.localStorage.getItem('soundEnabled');
    return storedValue ? storedValue === 'true' : true;
  });
  const [amplify] = useSound('/activate.mp3', {soundEnabled: true});
  const [mute] = useSound('/abort.mp3', {soundEnabled: true});
  useEffect(() => {
    soundEnabled ? amplify() : mute();
    window.localStorage.setItem('soundEnabled', soundEnabled.toString());
  }, [soundEnabled]);

  const toggleSound = (): void => setSoundEnabled(sound => !sound);

  return (
    <SoundContext.Provider value={{soundEnabled, toggleSound}}>
      {children}
    </SoundContext.Provider>
  );
};

const useSoundEnabled = () => {
  const data = useContext(SoundContext);

  if (!data)
    throw new Error('Cannot consume Sound context without a SoundProvider');

  return data;
};

export default useSoundEnabled;
