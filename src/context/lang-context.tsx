import {createContext, useState, useEffect, ReactNode} from 'react';

interface LangContextProps {
  lang: string;
  translate: (lang: string) => void;
}

const LangContext = createContext<LangContextProps>({
  lang: '',
  translate: () => {},
});

const storedState = localStorage.getItem('lang');

const initialState: string = storedState ? JSON.parse(storedState) : 'en';

export const LangProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [lang, setLang] = useState(initialState);

  useEffect(() => localStorage.setItem('lang', JSON.stringify(lang)), [lang]);

  const translate = (newLang: string): void => setLang(newLang);

  return (
    <LangContext.Provider value={{lang, translate}}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContext;
