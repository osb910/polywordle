/* eslint-disable react/prop-types */
import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useId,
  useRef,
} from 'react';
import styled from 'styled-components';
import Keyboard from './Keyboard';
import AppContext from '../../../lib/app-context';
import GameContext from '../../../lib/game-context';
import {game} from '../../../lib/ui-text';
import {
  addGuess,
  checkGuess,
  fillGuess,
  getWordleBoard,
} from '../../../lib/game-logic';
import WORDLES from '../../../lib/data/data';
import shuffleSfx from '../../../assets/sfx/shuffling-cards.mp3';

const GuessInput = ({className, setError}) => {
  const [guessInput, setGuessInput] = useState('');
  const [evaluating, setEvaluating] = useState(false);
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
  const sfxRef = useRef();

  const uiText = game[lang];
  const WORDS = WORDLES[lang][lettersPerWord];

  const changeGuess = useCallback(
    value => {
      const input = value.toUpperCase();
      if (lang === 'ar' && /[^\p{Script=Arabic}]/u.test(input)) return;
      if (lang === 'en' && /[^A-Za-z]/.test(input)) return;
      setGuessInput(input);
      const newGuesses = fillGuess(guesses, input, step);
      setGuesses(newGuesses);
    },
    [guesses, lang, setGuesses, step]
  );

  const submitGuess = useCallback(() => {
    if (guessInput.length < wordle.length) return;
    if (!WORDS.includes(guessInput)) {
      setError(uiText.unknownWord);
      changeGuess('');
      return;
    }

    const word = checkGuess(guessInput, wordle);
    const newGuesses = addGuess(guesses, word, step);
    setGuesses(newGuesses);

    sfxRef.current.play();
    setEvaluating(true);
    setGuessInput('');
    const timeoutId = setTimeout(() => setEvaluating(false), 2000);

    if (guessInput === wordle) {
      setGameWon(true);
      setGameOver(true);
      console.log(getWordleBoard(newGuesses, step));
      return;
    }

    setStep(step + 1);

    step === numOfAttempts && setGameOver(true);

    return () => clearTimeout(timeoutId);
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
      if (evaluating) return;
      if (gameOver) {
        key === 'Enter' && resetGame(lang);
        return;
      }

      if (key === 'Enter') {
        if (guessInput < lettersPerWord) return;
        submitGuess();
        return;
      }

      if (key === 'Backspace') {
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
        const newInput = guessInput + key.toUpperCase();
        if (newInput.length > lettersPerWord) return;
        changeGuess(newInput);
      }
    },
    [
      gameOver,
      guessInput,
      lettersPerWord,
      changeGuess,
      submitGuess,
      resetGame,
      lang,
      evaluating,
    ]
  );

  useEffect(() => {
    changeGuess('');
  }, []);

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
        disabled={gameOver || evaluating}
        onInput={evt => changeGuess(evt.target.value)}
        onKeyDown={evt =>
          /^(Enter|Backspace|[\p{L}])$/iu.test(evt.key) && evt.stopPropagation()
        }
      />
      <Keyboard onClick={handleKeyDown} lang={lang} />
      <audio
        id='shuffle-sfx'
        ref={sfxRef}
        src={shuffleSfx}
        preload='auto'
      ></audio>
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
