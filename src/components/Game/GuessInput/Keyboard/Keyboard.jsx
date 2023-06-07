import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styled, {css} from 'styled-components';
import {flipInX} from '../../../animations/keyframes';
import {useContext} from 'react';
import AppContext from '../../../../lib/app-context';
import GameContext from '../../../../lib/game-context';
import {game} from '../../../../lib/ui-text';
import KeyButton from './KeyButton/KeyButton';

// TODO: Optimize key press

const Keyboard = memo(({className, onClick}) => {
  const {lang} = useContext(AppContext);
  const {guesses, step, numOfAttempts, lettersPerWord, gameOver} =
    useContext(GameContext);
  const uiText = game[lang];
  const keys = uiText.keyboard;
  const [boardStatus, setBoardStatus] = useState({});
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        const alphabet = {};
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
    evt => {
      let {key} = evt;
      key = key === 'Enter' || key === '⌫' ? key : key.toUpperCase();
      if (activeKeys.includes(key)) return;
      setActiveKeys(prev => [...prev, key]);
    },
    [activeKeys, lang]
  );

  useEffect(() => {
    window.addEventListener('keypress', handleActiveKeys);
    return () => window.removeEventListener('keypress', handleActiveKeys);
  }, [handleActiveKeys]);

  const handleKeyUp = useCallback(
    evt => {
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
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  const getKeyName = key =>
    /[⮐⮑]/.test(key)
      ? 'Enter'
      : /[⌫⌦]/.test(key)
      ? 'Backspace'
      : key.toUpperCase();

  return (
    <section className={className}>
      {keys.map((row, idx) => (
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
  font-family: monospace;
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
