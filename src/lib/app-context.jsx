import {createContext, useReducer} from 'react';

const AppContext = createContext({
  lang: '',
  setLang: () => {},
  // isAuthented: null,
  // setAuth: () => {},
  // currentUser: {},
  // setUser: () => {},
  // theme: '',
  // setTheme: () => {},
});

const defaultState = JSON.parse(localStorage.getItem('state')) || {
  lang: 'en',
  isAuthented: false,
  currentUser: {},
  theme: 'light',
};

const appReducer = (state, action) => {
  if (action.type === 'TRANSLATE') {
    return {...state, lang: action.lang};
  }

  if (action.type === 'LOGIN') {
    return {...state, isAuthented: true};
  }
  if (action.type === 'LOGOUT') {
    return {...state, isAuthented: false};
  }

  if (action.type === 'CHANGE_USER') {
    return {...state, currentUser: action.user};
  }

  if (action.type === 'CHANGE_THEME') {
    return {...state, theme: action.theme};
  }

  return defaultState;
};

export const AppProvider = props => {
  const [appState, dispatchApp] = useReducer(appReducer, defaultState);

  const translate = lang => {
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
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
