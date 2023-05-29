import {useState, useContext, useEffect, useCallback} from 'react';
import AppContext from '../../lib/app-context';
import Grid from './Grid';
import GuessInput from './GuessInput/GuessInput';
import WonBanner from './WonBanner';
import LostBanner from './LostBanner';
import Banner from './Banner';
import {game} from '../../lib/ui-text';
import GameContext from '../../lib/game-context';

const Game = () => {
  const {lang} = useContext(AppContext);
  const {gameOver, gameWon, resetGame} = useContext(GameContext);

  const [error, setError] = useState(null);
  const uiText = game[lang];

  useEffect(() => {
    gameOver && resetGame(lang);
  }, []);

  return (
    <>
      <Grid />
      <GuessInput setError={setError} />
      {gameOver ? gameWon ? <WonBanner /> : <LostBanner /> : null}
      {error && (
        <Banner status='warning'>
          <p>{error}</p>
          <button onClick={() => setError(null)}>{uiText.ok}</button>
        </Banner>
      )}
    </>
  );
};

export default Game;
