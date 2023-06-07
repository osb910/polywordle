import {createContext, useMemo, useReducer} from 'react';
import {getInitialGuesses, getWordle} from './game-logic';

const GameContext = createContext({
  wordle: '',
  setWordle: () => {},
  guesses: {},
  setGuesses: () => {},
  step: 1,
  setStep: () => {},
  gameOver: false,
  setGameOver: () => {},
  gameWon: false,
  setGameWon: () => {},
  numOfAttempts: 0,
  setNumOfAttempts: () => {},
  lettersPerWord: 0,
  setLettersPerWord: () => {},
  resetGame: () => {},
});

let defaultState = JSON.parse(localStorage.getItem('gameState')) || {
  wordle: getWordle('en', '5'),
  gameOver: false,
  gameWon: false,
  step: 1,
  numOfAttempts: 6,
  lettersPerWord: 5,
};

const guessesState =
  JSON.parse(localStorage.getItem('guesses')) || getInitialGuesses(6, 5);

defaultState = {...defaultState, guesses: guessesState};

const appReducer = (state, action) => {
  if (action.type === 'SET_WORDLE') {
    return {...state, wordle: action.wordle};
  }

  if (action.type === 'SET_GAME_OVER') {
    return {...state, gameOver: action.gameOver};
  }

  if (action.type === 'SET_GAME_WON') {
    return {...state, gameWon: action.gameWon};
  }

  if (action.type === 'SET_GUESSES') {
    return {...state, guesses: action.guesses};
  }

  if (action.type === 'CHANGE_STEP') {
    return {...state, step: action.step};
  }

  if (action.type === 'CHANGE_NUM_OF_ATTEMPTS') {
    return {...state, numOfAttempts: action.numOfAttempts};
  }

  if (action.type === 'CHANGE_LETTERS_PER_WORD') {
    return {...state, lettersPerWord: action.lettersPerWord};
  }

  return defaultState;
};

export const GameProvider = props => {
  const [gameState, dispatchApp] = useReducer(appReducer, defaultState);

  const setWordle = wordle => {
    dispatchApp({type: 'SET_WORDLE', wordle});
    localStorage.setItem('gameState', JSON.stringify({...gameState, wordle}));
  };

  const setGameOver = gameOver => {
    dispatchApp({type: 'SET_GAME_OVER', gameOver});
    localStorage.setItem('gameState', JSON.stringify({...gameState, gameOver}));
  };

  const setGameWon = gameWon => {
    dispatchApp({type: 'SET_GAME_WON', gameWon});
    localStorage.setItem('gameState', JSON.stringify({...gameState, gameWon}));
  };

  const changeGuesses = guesses => {
    dispatchApp({type: 'SET_GUESSES', guesses});
    localStorage.setItem('guesses', JSON.stringify(guesses));
  };

  const changeStep = step => {
    dispatchApp({type: 'CHANGE_STEP', step});
    localStorage.setItem('gameState', JSON.stringify({...gameState, step}));
  };

  const changeNumOfAttempts = numOfAttempts => {
    dispatchApp({type: 'CHANGE_NUM_OF_ATTEMPTS', numOfAttempts});
    localStorage.setItem(
      'gameState',
      JSON.stringify({...gameState, numOfAttempts})
    );
  };

  const changeLettersPerWord = lettersPerWord => {
    dispatchApp({type: 'CHANGE_LETTERS_PER_WORD', lettersPerWord});
    localStorage.setItem(
      'gameState',
      JSON.stringify({...gameState, lettersPerWord})
    );
  };

  const resetGame = lang => {
    setWordle(getWordle(lang, gameState.lettersPerWord));
    setGameOver(false);
    setGameWon(false);
    changeGuesses(
      getInitialGuesses(gameState.numOfAttempts, gameState.lettersPerWord)
    );
    changeStep(1);
  };

  const value = useMemo(() => {
    return {
      wordle: gameState.wordle,
      gameOver: gameState.gameOver,
      gameWon: gameState.gameWon,
      guesses: gameState.guesses,
      step: gameState.step,
      numOfAttempts: gameState.numOfAttempts,
      lettersPerWord: gameState.lettersPerWord,
      setWordle,
      setGameOver,
      setGameWon,
      setGuesses: changeGuesses,
      setStep: changeStep,
      setNumOfAttempts: changeNumOfAttempts,
      setLettersPerWord: changeLettersPerWord,
      resetGame,
    };
  }, [gameState]);

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};

export default GameContext;
