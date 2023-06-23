import {useContext, useEffect} from 'react';
import Grid from './Grid';
import GuessInput from './GuessInput/GuessInput';
import GameContext from './game-context';
import LangContext from '../../context/lang-context';
import Toaster from '../Toaster';
import useToaster from '../Toaster/use-toaster';

const Game = () => {
  const {lang} = useContext(LangContext);
  const {gameOver, resetGame, numOfAttempts, lettersPerWord} =
    useContext(GameContext);
  const {clearToasts} = useToaster();

  useEffect(() => {
    gameOver && resetGame(lang);
    resetGame(lang);
    clearToasts();
  }, [lang, numOfAttempts, lettersPerWord]);

  return (
    <main>
      <Grid />
      <GuessInput />
      <Toaster />
    </main>
  );
};

export default Game;
