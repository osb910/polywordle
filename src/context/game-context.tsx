import {createContext, useMemo, ReactNode} from 'react';
import {useImmerReducer} from 'use-immer';
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

let initialState: GameState = storedGameState
  ? JSON.parse(storedGameState)
  : {
      wordle: getWordle('en', 5),
      guesses: getInitialGuesses(6, 5),
      gameOver: false,
      gameWon: false,
      step: 1,
      numOfAttempts: 6,
      lettersPerWord: 5,
    };

interface Action {
  type: string;
  [key: string]: any;
}

const reducer = (draft: GameState, action: Action): void => {
  const ACTIONS: {[key: string]: Function} = {
    'set-wordle': () => (draft.wordle = action.wordle),
    'set-game-over': () => (draft.gameOver = action.gameOver),
    'set-game-won': () => (draft.gameWon = action.gameWon),
    'set-guesses': () => (draft.guesses = action.guesses),
    'change-step': () => (draft.step = action.step),
    'change-num-of-attempts': () =>
      (draft.numOfAttempts = action.numOfAttempts),
    'change-letters-per-word': () =>
      (draft.lettersPerWord = action.lettersPerWord),
  };

  ACTIONS[action.type]?.() ?? draft;
};

export const GameProvider = ({children}: GameProviderProps): JSX.Element => {
  const [gameState, dispatch] = useImmerReducer(reducer, initialState);

  const setWordle = (wordle: string): void => {
    dispatch({type: 'set-wordle', wordle});
    localStorage.setItem('gameState', JSON.stringify({...gameState, wordle}));
  };

  const setGameOver = (gameOver: boolean): void => {
    dispatch({type: 'set-game-over', gameOver});
    localStorage.setItem('gameState', JSON.stringify({...gameState, gameOver}));
  };

  const setGameWon = (gameWon: boolean): void => {
    dispatch({type: 'set-game-won', gameWon});
    localStorage.setItem('gameState', JSON.stringify({...gameState, gameWon}));
  };

  const changeGuesses = (guesses: Guess[]): void => {
    dispatch({type: 'set-guesses', guesses});
    localStorage.setItem('gameState', JSON.stringify({...gameState, guesses}));
  };

  const changeStep = (step: number): void => {
    dispatch({type: 'change-step', step});
    localStorage.setItem('gameState', JSON.stringify({...gameState, step}));
  };

  const changeNumOfAttempts = (numOfAttempts: number): void => {
    dispatch({type: 'change-num-of-attempts', numOfAttempts});
    localStorage.setItem(
      'gameState',
      JSON.stringify({...gameState, numOfAttempts})
    );
  };

  const changeLettersPerWord = (lettersPerWord: number): void => {
    dispatch({type: 'change-letters-per-word', lettersPerWord});
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
