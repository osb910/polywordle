import {createContext, useReducer, ReactNode} from 'react';

interface AppState {
  lang: string;
  // isAuthented: boolean;
  // currentUser: any;
  // theme: string;
}
interface AppContextProps {
  lang: string;
  setLang: (lang: string) => void;
  // isAuthented: null;
  // setAuth: (auth: null | string) => void;
  // currentUser: {};
  // setUser: (user: {}) => void;
  // theme: '';
  // setTheme: (theme: string) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps>({
  lang: '',
  setLang: () => {},
  // isAuthented: null,
  // setAuth: () => {},
  // currentUser: {},
  // setUser: () => {},
  // theme: '',
  // setTheme: () => {},
});

const storedState = localStorage.getItem('state');

const defaultState: AppState = storedState
  ? JSON.parse(storedState)
  : {
      lang: 'en',
      isAuthented: false,
      currentUser: {},
      theme: 'light',
    };

type AppAction = {type: string; [key: string]: any};

const appReducer = (state: AppState, action: AppAction): AppState => {
  const ACTIONS: {[key: string]: Function} = {
    TRANSLATE: () => ({...state, lang: action.lang}),
    LOGIN: () => ({...state, isAuthented: true}),
    LOGOUT: () => ({...state, isAuthented: false}),
    CHANGE_USER: () => ({...state, currentUser: action.user}),
    CHANGE_THEME: () => ({...state, theme: action.theme}),
  };

  return ACTIONS[action.type] ? ACTIONS[action.type]() : defaultState;
};

export const AppProvider = ({children}: AppProviderProps): JSX.Element => {
  const [appState, dispatchApp] = useReducer(appReducer, defaultState);

  const translate = (lang: string): void => {
    dispatchApp({type: 'TRANSLATE', lang});
    localStorage.setItem('state', JSON.stringify({...appState, lang}));
  };

  // const authenticate = auth => {
  //   dispatchApp({type: auth});
  //   localStorage.setItem(
  //     'state',
  //     JSON.stringify({...appState, isAuthented: auth === 'LOGIN'})
  //   );
  // };

  // const changeUser = user => {
  //   dispatchApp({type: 'CHANGE_USER', user});
  //   localStorage.setItem(
  //     'state',
  //     JSON.stringify({...appState, currentUser: user})
  //   );
  // };

  // const changeTheme = theme => {
  //   dispatchApp({type: 'CHANGE_THEME', theme});
  //   localStorage.setItem('state', JSON.stringify({...appState, theme}));
  // };

  return (
    <AppContext.Provider
      value={{
        lang: appState.lang,
        // isAuthented: appState.isAuthented,
        // currentUser: appState.currentUser,
        // theme: appState.theme,
        setLang: translate,
        // setAuth: authenticate,
        // setUser: changeUser,
        // setTheme: changeTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
