import {useState, useEffect, useCallback} from 'react';
import {WORDS} from '../../data';
import Grid from './Grid';
import GuessInput from './GuessInput/GuessInput';
import {range, sample} from '../../utils';
import {LETTERS_PER_WORD, NUM_OF_GUESSES_ALLOWED} from '../../constants';
import {checkGuess} from '../../game-logic';
import WonBanner from './WonBanner';
import LostBanner from './LostBanner';
import Banner from './Banner';

const Game = () => {
  const getWordle = () => {
    const newWordle = sample(WORDS);
    console.info({newWordle});
    return newWordle;
  };
  const getInitialGuesses = () =>
    range(NUM_OF_GUESSES_ALLOWED).map(num => ({
      word: range(LETTERS_PER_WORD).map(() => ({letter: '', status: ''})),
      step: num + 1,
      id: crypto.randomUUID(),
    }));
  const [wordle, setWordle] = useState(getWordle);
  const [guesses, setGuesses] = useState(getInitialGuesses);
  const [step, setStep] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [error, setError] = useState(null);

  const addGuess = useCallback(
    newGuess => {
      if (!WORDS.includes(newGuess)) {
        setError('Not in the word list');
        setGuesses(current => {
          const newGuesses = [...current];
          newGuesses[step - 1].word = range(LETTERS_PER_WORD).map(() => ({
            letter: '',
            status: '',
          }));
          return newGuesses;
        });
        return;
      }
      const word = checkGuess(newGuess, wordle);
      setGuesses(prev =>
        [...prev].map(guess =>
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
      step === NUM_OF_GUESSES_ALLOWED && setGameOver(true);
      setStep(step + 1);
    },
    [step, wordle]
  );

  const resetGame = () => {
    setWordle(getWordle);
    setGuesses(getInitialGuesses);
    setStep(1);
    setGameOver(false);
    setGameWon(false);
  };

  const handleKeyDown = useCallback(
    evt => {
      const {key} = evt;
      if (gameOver) {
        key === 'Enter' && resetGame();
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
        return;
      }
      if (key === 'Backspace') {
        setGuesses(prev =>
          [...prev].map(guess => {
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
        setGuesses(prev =>
          [...prev].map(guess => {
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
    [addGuess, gameOver, guesses, step]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <Grid words={guesses} />
      <GuessInput
        guesses={guesses}
        step={step}
        addGuess={addGuess}
        gameOver={gameOver}
        onKeyDown={handleKeyDown}
      />
      {gameOver ? (
        gameWon ? (
          <WonBanner step={step} resetGame={resetGame} />
        ) : (
          <LostBanner wordle={wordle} resetGame={resetGame} />
        )
      ) : null}
      {error && (
        <Banner status='warning'>
          <p>{error}</p>
          <button onClick={() => setError(null)}>OK</button>
        </Banner>
      )}
    </>
  );
};

export default Game;
