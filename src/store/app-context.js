import {createContext, useReducer} from 'react';

const AppContext = createContext({
  lang: '',
  onTranslation: () => {},
  isAuthented: null,
  onAuthentication: () => {},
  currentUser: {},
  onUserChange: () => {},
  theme: '',
  onChangeTheme: () => {},
  numOfAttempts: 0,
  onNumOfAttemptsChange: () => {},
  lettersPerWord: 0,
  onLettersPerWordChange: () => {},
});

const defaultState = JSON.parse(localStorage.getItem('state')) || {
  lang: 'en',
  isAuthented: false,
  currentUser: {},
  theme: 'light',
  numOfAttempts: 6,
  lettersPerWord: 5,
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

  if (action.type === 'CHANGE_NUM_OF_ATTEMPTS') {
    return {...state, numOfAttempts: action.numOfAttempts};
  }

  if (action.type === 'CHANGE_LETTERS_PER_WORD') {
    return {...state, lettersPerWord: action.lettersPerWord};
  }

  return defaultState;
};

export const AppProvider = props => {
  const [appState, dispatchApp] = useReducer(appReducer, defaultState);

  const translate = lang => {
    dispatchApp({type: 'TRANSLATE', lang});
    localStorage.setItem('state', JSON.stringify({...appState, lang}));
  };

  const authenticate = auth => {
    dispatchApp({type: auth});
    localStorage.setItem(
      'state',
      JSON.stringify({...appState, isAuthented: auth === 'LOGIN'})
    );
  };

  const changeUser = user => {
    dispatchApp({type: 'CHANGE_USER', user});
    localStorage.setItem(
      'state',
      JSON.stringify({...appState, currentUser: user})
    );
  };

  const changeTheme = theme => {
    dispatchApp({type: 'CHANGE_THEME', theme});
    localStorage.setItem('state', JSON.stringify({...appState, theme}));
  };

  const changeNumOfAttempts = numOfAttempts => {
    dispatchApp({type: 'CHANGE_NUM_OF_ATTEMPTS', numOfAttempts});
    localStorage.setItem('state', JSON.stringify({...appState, numOfAttempts}));
  };

  const changeLettersPerWord = lettersPerWord => {
    dispatchApp({type: 'CHANGE_LETTERS_PER_WORD', lettersPerWord});
    localStorage.setItem(
      'state',
      JSON.stringify({...appState, lettersPerWord})
    );
  };

  return (
    <AppContext.Provider
      value={{
        lang: appState.lang,
        isAuthented: appState.isAuthented,
        currentUser: appState.currentUser,
        theme: appState.theme,
        numOfAttempts: appState.numOfAttempts,
        lettersPerWord: appState.lettersPerWord,
        onTranslation: translate,
        onAuthentication: authenticate,
        onUserChange: changeUser,
        onChangeTheme: changeTheme,
        onNumOfAttemptsChange: changeNumOfAttempts,
        onLettersPerWordChange: changeLettersPerWord,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
