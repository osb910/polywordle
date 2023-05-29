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

  const handleTranslator = evt => {
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
      <Translator lang={lang} changeLang={handleTranslator} />
    </header>
  );
};

const StyledHeader = styled(Header)`
  padding-block: 0.25em;
  margin-block-end: 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--color-gray-700);
  color: var(--color-gray-300);

  & .side {
    width: var(--header-height);
    display: grid;
    place-content: center;
  }

  & h1 {
    flex: 1;
    font-size: 2rem;
    /* line-height: var(--header-height); */
    text-align: center;
    justify-self: center;
    margin: 0 auto;
    padding: 0;
  }

  @media (max-width: 25rem) {
    font-size: 1.25rem;
  }
`;

export default StyledHeader;
