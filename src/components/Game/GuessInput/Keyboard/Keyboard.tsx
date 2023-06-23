import {memo, useCallback, useEffect, useState, KeyboardEvent} from 'react';
import styled, {css} from 'styled-components';
import {flipInX} from '../../../animations/keyframes';
import {useContext} from 'react';
import GameContext from '../../game-context';
import gameL10n from '../../../../l10n/game-l10n';
import KeyButton from './KeyButton/KeyButton';
import {ClickEvent} from './KeyButton/KeyButton';

interface KeyboardProps {
  className?: string;
  onClick: (evt: ClickEvent) => void;
  lang: string;
}

type BoardStatus = {
  [key: string]: string;
};

const Keyboard = memo(({className, onClick, lang}: KeyboardProps) => {
  const {guesses, step, numOfAttempts, lettersPerWord, gameOver} =
    useContext(GameContext);
  const {keyboard} = gameL10n[lang];
  const [boardStatus, setBoardStatus] = useState<BoardStatus>({});
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        const alphabet: {[key: string]: string} = {};
        for (let i = 0; i < step; i++) {
          if (!guesses[i]?.word) continue;
          const guess = [...guesses[i].word];
          guess.forEach(item => {
            if (alphabet[item.letter] === 'correct') return;
            alphabet[item.letter] = item.status;
          });
        }
        setBoardStatus(alphabet);
      },
      step === 1 && !gameOver ? 0 : 2000
    );

    return () => clearInterval(timeoutId);
  }, [lang, step, gameOver, numOfAttempts, lettersPerWord]);

  const handleActiveKeys = useCallback(
    (evt: KeyboardEvent) => {
      let {key} = evt;
      key = key === 'Enter' || key === '⌫' ? key : key.toUpperCase();
      if (activeKeys.includes(key)) return;
      setActiveKeys(prev => [...prev, key]);
    },
    [activeKeys, lang]
  );

  useEffect(() => {
    window.addEventListener(
      'keypress',
      handleActiveKeys as unknown as (evt: Event) => void
    );
    return () =>
      window.removeEventListener(
        'keypress',
        handleActiveKeys as unknown as (evt: Event) => void
      );
  }, [handleActiveKeys]);

  const handleKeyUp = useCallback(
    (evt: KeyboardEvent) => {
      let {key} = evt;
      key = key === 'Enter' || key === '⌫' ? key : key.toUpperCase();
      if (!activeKeys.includes(key)) return;
      setTimeout(
        () => setActiveKeys(prev => prev.filter(letter => letter !== key)),
        200
      );
    },
    [activeKeys, lang]
  );

  useEffect(() => {
    window.addEventListener(
      'keyup',
      handleKeyUp as unknown as (evt: Event) => void
    );
    return () =>
      window.removeEventListener(
        'keyup',
        handleKeyUp as unknown as (evt: Event) => void
      );
  }, [handleKeyUp]);

  const getKeyName = (key: string): string =>
    /[⮐⮑]/.test(key)
      ? 'Enter'
      : /[⌫⌦]/.test(key)
      ? 'Backspace'
      : key.toUpperCase();

  return (
    <section className={className}>
      {keyboard.map((row: string[], idx: number) => (
        <div key={idx} className='row'>
          {row.map(key => (
            <KeyButton
              key={key}
              btn={key}
              status={boardStatus[key]}
              active={activeKeys.includes(getKeyName(key))}
              keyName={getKeyName(key)}
              handleClick={onClick}
            />
          ))}
        </div>
      ))}
    </section>
  );
});

const StyledKeyboard = styled(Keyboard)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 1.25rem;
  font-family: 'Atkinson', monospace;
  ${({lang}) =>
    lang === 'ar'
      ? css`
          font-family: 'Uthman Taha';
          font-weight: 700;
          font-size: 1.4rem;
        `
      : ''}

  & > .row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  & > .row > button {
    flex: 0 0 auto;
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: var(--color-gray-900);
    font-weight: bold;
    color: var(--color-gray-100);
    cursor: pointer;
    transition: all 200ms ease-out;
  }

  & > .row > button kbd {
    font-family: inherit;
  }

  &
    > .row
    > button:is(.correct, .incorrect, .misplaced, .active, :hover, :focus) {
    color: white;
  }

  & > .row > button:where(.correct, .incorrect, .misplaced) {
    animation: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both ${flipInX};
  }

  & > .row > button.correct {
    background: var(--color-success);
    border-color: var(--color-success);
  }

  & > .row > button.incorrect {
    background: var(--color-gray-300);
    border-color: var(--color-gray-300);
  }

  & > .row > button.misplaced {
    background: var(--color-warning);
    border-color: var(--color-warning);
  }

  & > .row > button:is(.active, :hover, :focus) {
    background-color: navy;
    border-color: navy;
    scale: 1.1;
  }
`;

export default StyledKeyboard;
