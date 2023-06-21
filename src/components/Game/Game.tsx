import {useContext, useEffect} from 'react';
import Grid from './Grid';
import GuessInput from './GuessInput/GuessInput';
import GameContext from '../../context/game-context';
import LangContext from '../../context/lang-context';
import Toaster from '../Toaster/Toaster';
import ToastContext from '../../context/toast-context';

const Game = () => {
  const {lang} = useContext(LangContext);
  const {gameOver, resetGame, numOfAttempts, lettersPerWord} =
    useContext(GameContext);
  const {clearToasts} = useContext(ToastContext);

  useEffect(() => {
    gameOver && resetGame(lang);
    resetGame(lang);
    clearToasts();
  }, [lang, numOfAttempts, lettersPerWord]);

  useEffect(() => {
    // error && okRef.current.focus(); // BUG: clicks on mount
  }, []);

  return (
    <main>
      <Grid />
      <GuessInput />
      <Toaster />
    </main>
  );
};

export default Game;
