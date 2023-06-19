import {useState, useEffect, FC, MouseEvent} from 'react';
import globe from '../assets/images/globe.svg';
import styled from 'styled-components';
import {bump} from './animations/keyframes';

interface TranslatorProps {
  lang: string;
  changeLang: (evt: MouseEvent<HTMLLIElement>) => void;
  langDisplay?: string;
  className?: string;
}

const Translator: FC<TranslatorProps> = ({
  lang,
  changeLang,
  langDisplay,
  className,
}) => {
  const [translatorHighlighted, setTranslatorHighlighted] = useState(false);
  useEffect(() => {
    setTranslatorHighlighted(true);
    let timer = setTimeout(() => setTranslatorHighlighted(false), 700);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <div
      aria-label='Language'
      className={`${className} ${translatorHighlighted ? 'bump' : ''}`}
    >
      <img src={globe} alt='Language' />
      {langDisplay && <div className='current-lang'>{langDisplay}</div>}
      <ul>
        <li data-lang='en' onClick={changeLang}>
          English
        </li>
        <li data-lang='ar' onClick={changeLang}>
          العربية
        </li>
      </ul>
    </div>
  );
};

const StyledTranslator = styled(Translator)`
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

export default StyledTranslator;
