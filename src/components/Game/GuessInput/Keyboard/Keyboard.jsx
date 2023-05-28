import {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {flipInX} from '../../../animations/keyframes';

const Keyboard = ({className, onClick, guesses, step, gameOver}) => {
  const keys = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const [letterStatus, setLetterStatus] = useState([]);
  const [activeKeys, setActiveKeys] = useState([]);
  useEffect(() => {
    if (gameOver) return setLetterStatus([]);
    if (step === 1) return;
    const prevGuess = [...guesses[step - 2].word].map(({letter, status}) => ({
      letter: letter.toLowerCase(),
      status,
    }));

    setLetterStatus(current =>
      [...prevGuess, ...current].sort(({status}) =>
        status === 'correct' ? -1 : 1
      )
    );
  }, [step, gameOver]);

  const handleActiveKeys = useCallback(
    evt => {
      const {key} = evt;
      if (key === 'Enter') return;
      if (key === 'Backspace') return;
      if (key.length === 1 && !activeKeys.includes(key)) {
        setActiveKeys(prev => [...prev, key]);
      }
    },
    [activeKeys]
  );

  useEffect(() => {
    window.addEventListener('keypress', handleActiveKeys);
    return () => window.removeEventListener('keypress', handleActiveKeys);
  }, [handleActiveKeys]);

  const handleKeyUp = useCallback(
    evt => {
      const {key} = evt;
      if (key === 'Enter') return;
      if (key === 'Backspace') return;
      if (key.length === 1 && activeKeys.includes(key)) {
        setTimeout(
          () => setActiveKeys(prev => prev.filter(letter => letter !== key)),
          200
        );
      }
    },
    [activeKeys]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return (
    <section className={className}>
      {keys.map((row, idx) => (
        <div key={idx} className='row'>
          {row.split('').map(key => (
            <button
              className={`
                ${letterStatus.find(({letter}) => letter === key)?.status} ${
                activeKeys.includes(key) ? 'active' : ''
              }
              `}
              data-letter={`${key.toUpperCase()}`}
              type='button'
              key={key}
              onClick={evt => onClick({...evt, key})}
            >
              <kbd>{key.toUpperCase()}</kbd>
            </button>
          ))}
        </div>
      ))}
    </section>
  );
};

const StyledKeyboard = styled(Keyboard)`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > .row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  & > .row > button {
    flex: 0 0 auto;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: var(--color-gray-900);
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--color-gray-100);
    cursor: pointer;
    transition: all 200ms ease-out;
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
