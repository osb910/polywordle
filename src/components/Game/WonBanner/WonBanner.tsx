import {useContext, FC} from 'react';
import Banner from '../Banner';
import AppContext from '../../../context/app-context';
import gameL10n from '../../../l10n/game-l10n';
import GameContext from '../../../context/game-context';

const WonBanner: FC = () => {
  const {lang} = useContext(AppContext);
  const {step, numOfAttempts, resetGame} = useContext(GameContext);
  const l10n = gameL10n[lang];
  return (
    <Banner status='happy'>
      <p>{l10n.wonMessage(Math.min(step, numOfAttempts))}</p>
      <button onClick={() => resetGame(lang)}>{l10n.reset}</button>
    </Banner>
  );
};

export default WonBanner;
