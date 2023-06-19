import {createContext, useMemo, useReducer, ReactNode} from 'react';
import {getInitialGuesses, getWordle} from '../lib/game-logic';

type Letter = {
  letter: string;
  status: string;
};

type Guess = {
  word: Letter[];
  step: number;
  id: string;
};

interface GameState {
  wordle: string;
  guesses: Guess[];
  step: number;
  gameOver: boolean;
  gameWon: boolean;
  numOfAttempts: number;
  lettersPerWord: number;
}

interface GameContextProps {
  wordle: string;
  setWordle: (wordle: string) => void;
  guesses: Guess[];
  setGuesses: (guesses: any) => void;
  step: number;
  setStep: (step: number) => void;
  gameOver: boolean;
  setGameOver: (gameOver: boolean) => void;
  gameWon: boolean;
  setGameWon: (gameWon: boolean) => void;
  numOfAttempts: number;
  setNumOfAttempts: (numOfAttempts: number) => void;
  lettersPerWord: number;
  setLettersPerWord: (lettersPerWord: number) => void;
  resetGame: (lang: string) => void;
}

interface GameProviderProps {
  children: ReactNode;
}

const GameContext = createContext<GameContextProps>({
  wordle: '',
  setWordle: () => {},
  guesses: [],
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

const storedGameState = localStorage.getItem('gameState');

let defaultState: GameState = storedGameState
  ? JSON.parse(storedGameState)
  : {
      wordle: getWordle('en', 5),
      gameOver: false,
      gameWon: false,
      step: 1,
      numOfAttempts: 6,
      lettersPerWord: 5,
    };

const storedGuessState = localStorage.getItem('guesses');

const guessesState = storedGuessState
  ? JSON.parse(storedGuessState)
  : getInitialGuesses(6, 5);

defaultState = {...defaultState, guesses: guessesState};

interface Action {
  type: string;
  [key: string]: any;
}

const appReducer = (state: GameState, action: Action): GameState => {
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

export const GameProvider = ({children}: GameProviderProps): JSX.Element => {
  const [gameState, dispatchApp] = useReducer(appReducer, defaultState);

  const setWordle = (wordle: string): void => {
    dispatchApp({type: 'SET_WORDLE', wordle});
    localStorage.setItem('gameState', JSON.stringify({...gameState, wordle}));
  };

  const setGameOver = (gameOver: boolean): void => {
    dispatchApp({type: 'SET_GAME_OVER', gameOver});
    localStorage.setItem('gameState', JSON.stringify({...gameState, gameOver}));
  };

  const setGameWon = (gameWon: boolean): void => {
    dispatchApp({type: 'SET_GAME_WON', gameWon});
    localStorage.setItem('gameState', JSON.stringify({...gameState, gameWon}));
  };

  const changeGuesses = (guesses: any): void => {
    dispatchApp({type: 'SET_GUESSES', guesses});
    localStorage.setItem('guesses', JSON.stringify(guesses));
  };

  const changeStep = (step: number): void => {
    dispatchApp({type: 'CHANGE_STEP', step});
    localStorage.setItem('gameState', JSON.stringify({...gameState, step}));
  };

  const changeNumOfAttempts = (numOfAttempts: number): void => {
    dispatchApp({type: 'CHANGE_NUM_OF_ATTEMPTS', numOfAttempts});
    localStorage.setItem(
      'gameState',
      JSON.stringify({...gameState, numOfAttempts})
    );
  };

  const changeLettersPerWord = (lettersPerWord: number): void => {
    dispatchApp({type: 'CHANGE_LETTERS_PER_WORD', lettersPerWord});
    localStorage.setItem(
      'gameState',
      JSON.stringify({...gameState, lettersPerWord})
    );
  };

  const resetGame = (lang: string): void => {
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

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameContext;
