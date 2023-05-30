/* eslint-disable react/prop-types */
import {useState, useEffect, useContext, useCallback, useId} from 'react';
import styled from 'styled-components';
import Keyboard from './Keyboard';
import AppContext from '../../../lib/app-context';
import GameContext from '../../../lib/game-context';
import {game} from '../../../lib/ui-text';
import {checkGuess} from '../../../lib/game-logic';
import WORDLES from '../../../lib/data/data';
import shuffleSfx from '../../../assets/sfx/shuffling-cards.mp3';

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
  const id = useId();

  const uiText = game[lang];
  const WORDS = WORDLES[lang][lettersPerWord];

  const shuffle = () => {
    const shuffleEl = document.querySelector('#shuffle-sfx');
    console.log(shuffleEl);
    shuffleEl.play();
  };

  useEffect(() => {
    setGuessInput(guesses[step - 1].word.map(({letter}) => letter).join(''));
  }, []);

  const changeGuess = useCallback(
    value => {
      const input = value.toUpperCase();
      if (lang === 'ar' && /[^\p{Script=Arabic}]/u.test(input)) return;
      if (lang === 'en' && /[^A-Za-z]/.test(input)) return;
      setGuessInput(input);
      setGuesses(
        [...guesses].map(guess =>
          guess.step === step
            ? {
                ...guess,
                word: guess.word.map((_, idx) => ({
                  letter: input[idx] ?? '',
                  status: input[idx] ? 'filled' : '',
                })),
              }
            : guess
        )
      );
    },
    [guesses, lang, setGuesses, step]
  );

  const submitGuess = useCallback(() => {
    if (!WORDS.includes(guessInput)) {
      setError(uiText.unknownWord);
      changeGuess('');
      return;
    }

    const word = checkGuess(guessInput, wordle);
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

    shuffle();
    setGuessInput('');

    if (guessInput === wordle) {
      setGameWon(true);
      setGameOver(true);
      return;
    }

    setStep(step + 1);

    step === numOfAttempts && setGameOver(true);
  }, [
    guessInput,
    WORDS,
    guesses,
    numOfAttempts,
    setError,
    setGameOver,
    setGameWon,
    setGuesses,
    setStep,
    step,
    wordle,
    changeGuess,
    uiText.unknownWord,
  ]);

  const handleKeyDown = useCallback(
    evt => {
      let {key, which, shiftKey} = evt;
      // key =
      //   key === 'Unidentified' && which === 66
      //     ? shiftKey
      //       ? 'لءا'
      //       : 'لا'
      //     : key === 'آ'
      //     ? 'ءا'
      //     : key;
      const pressLetter = letter => {
        const newInput = guessInput + letter.toUpperCase();
        if (newInput.length > lettersPerWord) return;
        changeGuess(newInput);
      };
      if (gameOver) {
        key === 'Enter' && resetGame(lang);
        return;
      }

      // if (
      //   /Enter|Backspace|\p{L}{1}/u.test(key) &&
      //   document.activeElement.id === `${id}-guess-input`
      // )
      //   return;
      if (key === 'Enter') {
        document.activeElement.id === `${id}-guess-input`;
        if (guessInput < lettersPerWord) return;
        submitGuess();
        return;
      }

      if (key === 'Backspace') {
        if (document.activeElement.id === `${id}-guess-input`) return;
        const newInput =
          guessInput.length === 1
            ? ''
            : guessInput
                .split('')
                .slice(0, guessInput.length - 1)
                .join('');
        changeGuess(newInput);
        return;
      }

      if (key.length === 1) {
        if (document.activeElement.id === `${id}-guess-input`) return;
        pressLetter(key);
      }
    },
    [
      gameOver,
      guessInput,
      lettersPerWord,
      id,
      changeGuess,
      submitGuess,
      resetGame,
      lang,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        submitGuess();
      }}
      className={className}
    >
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
        onInput={evt => changeGuess(evt.target.value)}
      />
      <Keyboard onClick={handleKeyDown} lang={lang} />
      <audio id='shuffle-sfx' src={shuffleSfx} preload='auto'></audio>
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
