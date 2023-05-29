import WORDLES from './data/data';
import {range, sample} from './utils';

export const getWordle = (lang, lettersPerWord) => {
  const newWordle = sample(WORDLES[lang][lettersPerWord]);
  console.info({newWordle});
  return newWordle;
};

export const getInitialGuesses = (numOfAttempts, lettersPerWord) =>
  range(numOfAttempts).map(num => ({
    word: range(lettersPerWord).map(() => ({
      letter: '',
      status: '',
    })),
    step: num + 1,
    id: crypto.randomUUID(),
  }));

export const checkGuess = (guess, answer) => {
  if (!guess) return null;
  const classification = guess
    .toUpperCase()
    .split('')
    .map((letter, idx) => ({
      letter,
      status:
        letter === answer[idx]
          ? 'correct'
          : answer.includes(letter)
          ? 'misplaced'
          : 'incorrect',
    }));
  return classification;
};
