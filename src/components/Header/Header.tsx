import {FC, useContext, MouseEvent} from 'react';
import styled from 'styled-components';
import AppContext from '../../context/app-context';
import GameContext from '../../context/game-context';
import headerL10n from '../../l10n/header-l10n';
import Translator from '../Translator';

const Header: FC<{className?: string}> = ({className}) => {
  const {lang, setLang} = useContext(AppContext);
  const {resetGame} = useContext(GameContext);
  const l10n = headerL10n[lang];

  const handleTranslation = (evt: MouseEvent) => {
    const newLang = (evt.target as HTMLElement).dataset.lang;
    if (!newLang || lang === newLang) return;
    const confirmReset = confirm(l10n.resetPrompt);
    if (confirmReset) {
      resetGame(newLang);
      setLang(newLang);
    }
  };

  return (
    <header className={className}>
      <h1>{l10n.logo}</h1>
      <section className='settings app'>
        <Translator lang={lang} changeLang={handleTranslation} />
      </section>
      {/* <section className='settings game'>Game Settings</section> */}
    </header>
  );
};

const StyledHeader = styled(Header)`
  padding-block: 0.5em;
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
