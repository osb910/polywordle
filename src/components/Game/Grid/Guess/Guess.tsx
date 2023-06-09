import {memo, useContext} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {bump, closeGap, flipInX} from '../../../animations/keyframes';
import GameContext from '../../game-context';
import {isKashidable, kashidify} from '../../../../lib/utils';
import useLocalizer from '../../../Localizer/use-localizer';

type Letter = {
  letter: string;
  status: string;
};

interface GuessProps {
  className?: string;
  word: Letter[];
  step: number;
}

const Guess = memo(({word, step, className}: GuessProps) => {
  const {lang} = useLocalizer();
  const {step: gameStep, gameOver} = useContext(GameContext);
  return (
    <ul
      className={`${className} ${
        step < gameStep || (step === gameStep && gameOver) ? 'done' : ''
      }`}
      lang={lang}
    >
      {word.map(({letter, status}, idx, arr) => (
        <li className={`cell ${status}`} key={`${step}-${idx}`}>
          {isKashidable(arr[idx - 1]?.letter) && letter ? '\u0640' : ''}
          {idx === arr.length - 1 ? letter : kashidify(letter)}
        </li>
      ))}
    </ul>
  );
});

const StyledGuess = styled(Guess)`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  list-style: none;
  flex: 0;

  &.done {
    animation: 600ms ease-in both ${closeGap};
    animation-delay: ${({theme}) => (theme.lettersPerWord - 1) * 410}ms;
  }

  &::before {
    content: ${({theme, step}) =>
      `'${
        step === 0
          ? ''
          : theme.lang === 'ar'
          ? (+step).toLocaleString('ar-EG')
          : step
      }'`};
    position: absolute;
    z-index: -1;
    inset-inline-start: -0.9em;
    font-size: 2rem;
    font-weight: 400;
    color: var(--color-gray-700);
    opacity: 0.8;
    animation: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both ${flipInX};
  }

  & > .cell {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-content: center;
    aspect-ratio: 1 / 1;
    border: 2px solid var(--color-gray-700);
    font-size: 1.5rem;
    transition: all 200ms ease-out;
    animation: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both ${flipInX};
    --radius: 6px;
  }

  &.done > .cell:nth-child(2) {
    animation-delay: 0.4s;
  }

  &.done > .cell:nth-child(3) {
    animation-delay: 0.8s;
  }

  &.done > .cell:nth-child(4) {
    animation-delay: 1.2s;
  }

  &.done > .cell:nth-child(5) {
    animation-delay: 1.6s;
  }

  &.done > .cell:nth-child(6) {
    animation-delay: 2s;
  }

  &.done > .cell:nth-child(7) {
    animation-delay: 2.4s;
  }

  &.done > .cell:nth-child(8) {
    animation-delay: 2.8s;
  }

  & > .cell.filled {
    animation: 350ms ease-out ${bump};
    animation-delay: 0;
  }

  & .cell.correct {
    background: var(--color-success);
    border-color: var(--color-success);
    color: white;
  }

  & .cell.incorrect {
    background: var(--color-gray-300);
    border-color: var(--color-gray-300);
    color: white;
  }

  & .cell.misplaced {
    background: var(--color-warning);
    border-color: var(--color-warning);
    color: white;
  }

  &:first-of-type .cell:first-of-type {
    border-start-start-radius: var(--radius);
  }
  &:first-of-type .cell:last-of-type {
    border-start-end-radius: var(--radius);
  }
  &:last-of-type .cell:first-of-type {
    border-end-start-radius: var(--radius);
  }
  &:last-of-type .cell:last-of-type {
    border-end-end-radius: var(--radius);
  }
`;

interface GuessWithContextProps {
  word: Letter[];
  step: number;
}

const GuessWithContext = ({word, step}: GuessWithContextProps) => {
  const {lang} = useLocalizer();
  const {lettersPerWord} = useContext(GameContext);

  return (
    <ThemeProvider theme={{lang, lettersPerWord}}>
      <StyledGuess word={word} step={step} />
    </ThemeProvider>
  );
};

export default GuessWithContext;
