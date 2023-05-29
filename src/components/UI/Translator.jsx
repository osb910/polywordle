import {useState, useEffect} from 'react';
import globe from '../../assets/images/globe.svg';
import styled from 'styled-components';
import {bump} from '../animations/keyframes';

const StyledTranslator = styled.div.attrs(props => ({ariaLabel: 'Language'}))`
  --sec-color: #a8dadc;
  --ter-color: #457b9d;
  --hex-color: #1d3557;
  --sept-color: #e1eaee;

  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.4em;
  margin: 0 0.8em;
  border-radius: 1rem;
  background-color: var(--sept-color);
  cursor: pointer;
  font-family: 'Calibri';
  color: var(--hex-color);

  .rtl & .current-lang {
    font-family: Lotus;
    font-weight: 700;
    font-size: 1.3rem;
  }

  & img {
    width: 1.5rem;
    margin: 0;
    stroke: var(--hex-color);
    color: var(--hex-color);
    border-radius: 50%;
  }

  & .current-lang {
    font-weight: 700;
    padding: 0;
    margin: 0;
  }

  & ul {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    padding: 0;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid var(--sec-color);
    box-shadow: 1px 2px 25px rgba(0, 0, 0, 0.2);
    visibility: hidden;
    top: 2rem;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }

  &:hover ul {
    visibility: visible;
    opacity: 1;
  }

  & ul li:first-child {
    border-radius: 6px 6px 0 0;
  }

  & ul li:last-child {
    border-radius: 0 0 6px 6px;
  }

  & ul li {
    width: 100%;
    text-align: center;
    padding: 0.3em 0.5em;
    background-color: #fff;
  }

  & ul li:hover {
    background-color: var(--sept-color);
  }

  .dark & {
    color: var(--sept-color);
  }

  .dark & ul li {
    background-color: var(--hex-color);
  }

  .dark & ul li:hover {
    background-color: var(--ter-color);
  }

  &.bump {
    animation: ${bump} 500ms ease-in-out;
  }
`;

const Translator = ({lang, changeLang}) => {
  const [translatorHighlighted, setTranslatorHighlighted] = useState(false);
  useEffect(() => {
    setTranslatorHighlighted(true);
    let timer = setTimeout(() => setTranslatorHighlighted(false), 700);
    return () => clearTimeout(timer);
  }, [lang]);

  const langDisplay = {
    en: 'En',
    ar: 'ع',
  };
  return (
    <StyledTranslator
      className={translatorHighlighted && 'bump'}
      onClick={changeLang}
    >
      <img src={globe} alt='Language' />
      {/* <div className='current-lang'>{langDisplay[lang]}</div> */}
      <ul>
        <li data-lang='en'>English</li>
        <li data-lang='ar'>العربية</li>
      </ul>
    </StyledTranslator>
  );
};

export default Translator;
