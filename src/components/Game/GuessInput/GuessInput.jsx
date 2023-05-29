import {useState, useEffect, useContext, useCallback, useId} from 'react';
import styled from 'styled-components';
import Keyboard from './Keyboard';
import AppContext from '../../../lib/app-context';
import GameContext from '../../../lib/game-context';
import {game} from '../../../lib/ui-text';
import {checkGuess} from '../../../lib/game-logic';
import {range} from '../../../lib/utils';
import WORDLES from '../../../lib/data/data';

const GuessInput = ({className, setError}) => {
  const [guessInput, setGuessInput] = useState('');
  const {lang} = useContext(AppContext);
  const {
    guesses,
    setGuesses,
    wordle,
    gameOver,
    setGameOver,
    setGameWon,
    step,
    setStep,
    resetGame,
    numOfAttempts,
    lettersPerWord,
  } = useContext(GameContext);
  const uiText = game[lang];
  const id = useId();
  const WORDS = WORDLES[lang][lettersPerWord];

  const changeGuess = evt => {
    const input = evt.target.value.toUpperCase();
    if (lang === 'ar' && !/\p{Script=Arabic}/u.test(input)) return;
    if (lang === 'en' && !/[A-Za-z]/u.test(input)) return;
    setGuessInput(input);
  };
  const addGuess = newGuess => {
    console.log({step});
    if (!WORDS.includes(newGuess)) {
      setError('Not in the word list');
      const newGuesses = [...guesses];
      newGuesses[step - 1].word = range(lettersPerWord).map(() => ({
        letter: '',
        status: '',
      }));
      setGuesses(newGuesses);
      return;
    }

    const word = checkGuess(newGuess, wordle);
    setGuesses(
      [...guesses].map(guess =>
        guess.step === step
          ? {
              word,
              step,
              id: crypto.randomUUID(),
            }
          : guess
      )
    );

    if (word.every(({status}) => status === 'correct')) {
      setGameWon(true);
      setGameOver(true);
      return;
    }
    setStep(step + 1);

    step === numOfAttempts && setGameOver(true);
  };
  const submitGuess = evt => {
    evt.preventDefault();
    addGuess(guessInput);
    setGuessInput('');
  };

  const handleKeyDown = useCallback(
    evt => {
      const {key} = evt;
      if (gameOver) {
        key === 'Enter' && resetGame(lang);
        return;
      }
      if (key === 'Enter') {
        if (document.activeElement.id === 'guess-input') return;
        if (guesses[step - 1].word.some(({letter}) => !letter)) return;
        guesses[step - 1].word.every(({letter}) => !!letter) &&
          evt.preventDefault();
        addGuess(
          guesses[step - 1].word
            .map(({letter}) => letter.toUpperCase())
            .join('')
        );
        setGuessInput('');
        return;
      }
      if (key === 'Backspace') {
        setGuesses(
          [...guesses].map(guess => {
            if (guess.step === step) {
              const newWord = [...guess.word].map((obj, idx, arr) =>
                !arr[idx + 1]?.letter ? {letter: '', status: ''} : obj
              );
              return {
                ...guess,
                word: newWord,
              };
            } else {
              return guess;
            }
          })
        );
        return;
      }
      if (key.length === 1) {
        if (lang === 'ar' && !/\p{Script=Arabic}/u.test(key)) return;
        if (lang === 'en' && !/[A-Za-z]/u.test(key)) return;
        setGuesses(
          [...guesses].map(guess => {
            if (guess.step === step) {
              const emptyIdx = guess.word.findIndex(({letter}) => !letter);
              const newWord = [...guess.word];
              newWord[emptyIdx] = {letter: key.toUpperCase(), status: ''};
              return {
                ...guess,
                word: newWord,
              };
            } else {
              return guess;
            }
          })
        );
      }
    },
    [gameOver, guesses, step]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <form onSubmit={submitGuess} className={className}>
      <label htmlFor={`${id}-guess-input`}>{uiText.inputLabel}</label>
      <input
        type='text'
        required
        id={`${id}-guess-input`}
        dir='auto'
        autoComplete='off'
        value={guessInput}
        minLength={lettersPerWord}
        maxLength={lettersPerWord}
        pattern={`\\p{L}{${lettersPerWord}}`}
        title={`${lettersPerWord} letter word`}
        disabled={gameOver}
        onInput={changeGuess}
      />
      <Keyboard onClick={handleKeyDown} lang={lang} />
    </form>
  );
};

const StyledGuessInput = styled(GuessInput)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;

  & > label {
    font-size: 1.25rem;
  }

  & > input {
    width: 60%;
    max-width: 300px;
    min-width: 200px;
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
