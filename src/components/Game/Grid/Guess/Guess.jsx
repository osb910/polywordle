import styled from 'styled-components';
import {isRtlScript} from '../../../../utils';
import {flipInX} from '../../../animations/keyframes';

const Guess = ({word, className, key}) => (
  <ul dir='auto' className={className}>
    {word.map(({letter, status}, idx) => (
      <li className={`cell ${status}`} key={`${key}-${idx}`}>
        {letter}
      </li>
    ))}
  </ul>
);

const StyledGuess = styled(Guess)`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  list-style: none;

  &::before {
    content: ${({word, step}) =>
      `'${
        word.some(({letter}) => isRtlScript(letter))
          ? (+step).toLocaleString('ar-EG')
          : step
      }'`};
    position: absolute;
    z-index: -1;
    inset-inline-start: -0.75em;
    font-size: 2.2rem;
    font-weight: 600;
    color: var(--color-gray-700);
    opacity: 0.8;
    animation: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both ${flipInX};
  }

  & > .cell {
    position: relative;
    width: 3rem;
    height: 3rem;
    display: grid;
    place-content: center;
    aspect-ratio: 1 / 1;
    border: 2px solid var(--color-gray-700);
    font-size: 2rem;
    transition: all 200ms ease-out;
    animation: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both ${flipInX};
    --radius: 6px;
    /* scale: 1.1; */
  }

  & > .cell:nth-child(2) {
    animation-delay: 0.4s;
  }

  & > .cell:nth-child(3) {
    animation-delay: 0.8s;
  }

  & > .cell:nth-child(4) {
    animation-delay: 1.2s;
  }

  & > .cell:nth-child(5) {
    animation-delay: 1.6s;
  }

  & > .cell:nth-child(6) {
    animation-delay: 2s;
  }

  & > .cell:nth-child(7) {
    animation-delay: 2.4s;
  }

  & > .cell:nth-child(8) {
    animation-delay: 2.8s;
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

export default StyledGuess;
