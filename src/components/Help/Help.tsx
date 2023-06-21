import {useContext} from 'react';
import {BsGithub, BsLinkedin, BsTwitter} from 'react-icons/bs';
import Guess from '../Game/Grid/Guess/Guess';
import LangContext from '../../context/lang-context';
import headerL10n from '../../l10n/header-l10n';
import styled from 'styled-components';

const Help = () => {
  const {lang} = useContext(LangContext);
  const l10n = headerL10n[lang];
  return (
    <Wrapper>
      <h1>{l10n.howToPlay}</h1>
      <ul className='game-rules'>{l10n.gameRules}</ul>
      <section>
        <h2>{l10n.examples}</h2>
        <ul className='examples'>
          {l10n.exampleGuesses.map(
            (guess: {word: any[]; explanation: any}, idx: number) => (
              <li key={idx}>
                <Guess word={guess.word} step={0} />
                {guess.explanation}
              </li>
            )
          )}
        </ul>
      </section>
      <section className='credit'>
        {l10n.credit}
        <p className='social-links'>
          <a href='https://github.com/osb910' target='_blank' rel='noreferrer'>
            <BsGithub />
          </a>
          <a
            href='https://linkedin.com/in/osbdev'
            target='_blank'
            rel='noreferrer'
          >
            <BsLinkedin />
          </a>
          <a
            href='https://twitter.com/omarshdev'
            target='_blank'
            rel='noreferrer'
          >
            <BsTwitter />
          </a>
        </p>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-y: auto;
  & h1 {
    font-size: 2rem;
    margin-block-end: 0.75em;
    line-height: 1;
  }

  & h2 {
    font-size: 1.5rem;
    margin-block-end: 0.25em;
  }

  section {
    padding-block: 0.25em;
    margin-block: 0.5em;
  }

  & .game-rules {
    margin-inline-start: 20px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    list-style: none;
  }

  & .game-rules li::before {
    content: '🟩';
    margin-block: 0;
    margin-inline-start: -20px;
    margin-inline-end: 10px;
    font-size: 0.75rem;
  }

  & .examples {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  & .examples li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1em;
  }

  & .credit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75em;
  }

  & .credit .social-links {
    display: flex;
    gap: 0.75em;
  }

  & .credit a {
    color: var(--color-gray-300);
    text-decoration: none;
    transition: all 200ms ease-in-out;
  }

  & .credit .social-links a {
    font-size: 1.5rem;
  }

  & .credit a:where(:hover, :focus) {
    color: var(--color-gray-500);
    transform: scale(1.1);
  }

  @media (min-width: 700px) {
    & .examples > li {
      flex-direction: row;
      justify-content: flex-start;
    }
  }
`;

export default Help;
