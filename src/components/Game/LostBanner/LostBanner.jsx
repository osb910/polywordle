import {useContext} from 'react';
import AppContext from '../../../lib/app-context';
import Banner from '../Banner';
import {game} from '../../../lib/ui-text';
import GameContext from '../../../lib/game-context';

const LostBanner = () => {
  const {lang} = useContext(AppContext);
  const {wordle, resetGame} = useContext(GameContext);
  const uiText = game[lang];
  return (
    <Banner status='sad'>
      <p>{uiText.lostMessage(wordle)}</p>
      <button onClick={() => resetGame(lang)}>{uiText.reset}</button>
    </Banner>
  );
};

export default LostBanner;
