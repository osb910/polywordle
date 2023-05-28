import {useState, useId} from 'react';
import styled from 'styled-components';
import {LETTERS_PER_WORD} from '../../../constants';
import Keyboard from './Keyboard';

const GuessInput = ({
  className,
  addGuess,
  gameOver,
  guesses,
  step,
  onKeyDown,
}) => {
  const [guessInput, setGuessInput] = useState('');
  const id = useId();

  const changeGuess = evt => setGuessInput(evt.target.value.toUpperCase());
  const submitGuess = evt => {
    evt.preventDefault();
    setGuessInput('');
    addGuess(guessInput);
  };

  return (
    <form onSubmit={submitGuess} className={className}>
      <label htmlFor={`${id}-guess-input`}>Type your guess:</label>
      <input
        type='text'
        required
        id={`${id}-guess-input`}
        dir='auto'
        autoComplete='off'
        value={guessInput}
        minLength={LETTERS_PER_WORD}
        maxLength={LETTERS_PER_WORD}
        pattern={`\\p{L}{${LETTERS_PER_WORD}}`}
        title={`${LETTERS_PER_WORD} letter word`}
        disabled={gameOver}
        onInput={changeGuess}
      />
      <Keyboard
        guesses={guesses}
        gameOver={gameOver}
        addGuess={addGuess}
        step={step}
        onClick={onKeyDown}
      />
    </form>
  );
};

const StyledGuessInput = styled(GuessInput)`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  /* height: 6.75rem; */

  & > label {
    font-size: 1.25rem;
  }

  & > input {
    width: 100%;
    font-size: 1.5rem;
    border: 2px solid var(--color-gray-300);
    border-radius: 4px;
    padding: 2px 4px;
    outline-offset: 4px;
    outline-color: navy;
    text-align: center;
  }
`;

export default StyledGuessInput;
