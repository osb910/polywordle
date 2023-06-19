import {useContext, FC} from 'react';
import AppContext from '../../../context/app-context';
import Banner from '../Banner';
import gameL10n from '../../../l10n/game-l10n';
import GameContext from '../../../context/game-context';

const LostBanner: FC = () => {
  const {lang} = useContext(AppContext);
  const {wordle, resetGame} = useContext(GameContext);
  const l10n = gameL10n[lang];
  return (
    <Banner status='sad'>
      <p>{l10n.lostMessage(wordle)}</p>
      <button onClick={() => resetGame(lang)}>{l10n.reset}</button>
    </Banner>
  );
};

export default LostBanner;
