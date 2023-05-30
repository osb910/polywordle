import {useContext} from 'react';
import styled from 'styled-components';
import AppContext from '../../lib/app-context';
import {header} from '../../lib/ui-text';
import Translator from '../UI/Translator';
import GameContext from '../../lib/game-context';

const Header = ({className}) => {
  const {lang, setLang} = useContext(AppContext);
  const {resetGame} = useContext(GameContext);
  const uiText = header[lang];

  const handleTranslation = evt => {
    const newLang = evt.target.dataset.lang;
    if (!newLang || lang === newLang) return;
    const confirmReset = confirm(uiText.resetPrompt);
    if (confirmReset) {
      resetGame(newLang);
      setLang(newLang);
    }
  };

  return (
    <header className={className}>
      <h1>{uiText.logo}</h1>
      <section className='settings app'>
        <Translator lang={lang} changeLang={handleTranslation} />
      </section>
      {/* <section className='settings game'>Game Settings</section> */}
    </header>
  );
};

const StyledHeader = styled(Header)`
  padding-block: 0.25em;
  margin-block-end: 0.75em;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  grid-template-areas: 'app-settings title game-settings';
  align-items: center;
  border-bottom: 1px solid var(--color-gray-700);
  color: var(--color-gray-300);

  & .side {
    width: var(--header-height);
    display: grid;
    place-content: center;
  }

  & h1 {
    grid-area: title;
    font-size: 2rem;
    text-align: center;
    padding: 0;
  }

  & .settings {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .settings.app {
    grid-area: app-settings;
  }

  & .settings.game {
    grid-area: game-settings;
  }

  @media (max-width: 25rem) {
    font-size: 1.25rem;
  }
`;

export default StyledHeader;
