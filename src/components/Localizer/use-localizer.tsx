import {createContext, useState, useEffect, useContext, ReactNode} from 'react';

interface L10nContextProps {
  lang: string;
  translate: (lang: string) => void;
}

const L10nContext = createContext<L10nContextProps>({
  lang: '',
  translate: () => {},
});

const storedState = localStorage.getItem('lang');

const initialState: string = storedState ? JSON.parse(storedState) : 'en';

export const L10nProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [lang, setLang] = useState(initialState);

  useEffect(() => localStorage.setItem('lang', JSON.stringify(lang)), [lang]);

  const translate = (newLang: string): void => setLang(newLang);

  return (
    <L10nContext.Provider value={{lang, translate}}>
      {children}
    </L10nContext.Provider>
  );
};

const useLocalizer = () => {
  const data = useContext(L10nContext);

  if (!data)
    throw new Error('Cannot consume Lang context without a L10nProvider');

  return data;
};

export default useLocalizer;
