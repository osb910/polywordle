'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

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
  useEffect(() => {
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
