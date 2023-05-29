import {useContext} from 'react';
import Banner from '../Banner';
import AppContext from '../../../lib/app-context';
import {game} from '../../../lib/ui-text';
import GameContext from '../../../lib/game-context';

const WonBanner = () => {
  const {lang} = useContext(AppContext);
  const {step, numOfAttempts, resetGame} = useContext(GameContext);
  const uiText = game[lang];
  return (
    <Banner status='happy'>
      <p>{uiText.wonMessage(Math.min(step, numOfAttempts))}</p>
      <button onClick={() => resetGame(lang)}>{uiText.reset}</button>
    </Banner>
  );
};

export default WonBanner;
