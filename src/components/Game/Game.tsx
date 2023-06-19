import {useState, useContext, useEffect, useRef} from 'react';
import AppContext from '../../context/app-context';
import Grid from './Grid';
import GuessInput from './GuessInput/GuessInput';
import WonBanner from './WonBanner';
import LostBanner from './LostBanner';
import Banner from './Banner';
import gameL10n from '../../l10n/game-l10n';
import GameContext from '../../context/game-context';

const Game = () => {
  const {lang} = useContext(AppContext);
  const {gameOver, gameWon, resetGame} = useContext(GameContext);

  const [error, setError] = useState(null);
  const okRef = useRef(null);
  const l10n = gameL10n[lang];

  useEffect(() => {
    gameOver && resetGame(lang);
  }, []);

  useEffect(() => {
    // error && okRef.current.focus(); // BUG: clicks on mount
  }, []);

  return (
    <>
      <Grid />
      <GuessInput setError={setError} />
      {gameOver ? gameWon ? <WonBanner /> : <LostBanner /> : null}
      {error && (
        <Banner status='warning'>
          <p>{error}</p>
          <button type='button' ref={okRef} onClick={() => setError(null)}>
            {l10n.ok}
          </button>
        </Banner>
      )}
    </>
  );
};

export default Game;
