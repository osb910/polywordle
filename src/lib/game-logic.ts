import WORDLES from './data/data';
import {range, sample} from './utils';

export const getWordle = (lang: string, lettersPerWord: number): string => {
  const newWordle = sample(WORDLES[lang][lettersPerWord]);
  console.info({newWordle});
  return newWordle;
};

type Letter = {
  letter: string;
  status: string;
};

type Guess = {
  word: Letter[];
  step: number;
  id: string;
};

export const getInitialGuesses = (
  numOfAttempts: number,
  lettersPerWord: number
): Guess[] =>
  range(numOfAttempts).map(num => ({
    word: range(lettersPerWord).map(() => ({
      letter: '',
      status: '',
    })),
    step: num + 1,
    id: crypto.randomUUID(),
  }));

export const checkGuess = (guess: string, answer: string): Letter[] | null => {
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

export const addGuess = (
  guesses: Guess[],
  word: Letter[],
  step: number
): Guess[] =>
  [...guesses].map(guess =>
    guess.step === step
      ? {
          word,
          step,
          id: crypto.randomUUID(),
        }
      : guess
  );

export const fillGuess = (
  guesses: Guess[],
  input: string,
  step: number
): Guess[] =>
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
  );

export const getWordleBoard = (guesses: Guess[], step: number): string => {
  const board = [];
  for (let i = 0; i < step; i++) {
    const squares = guesses[i].word
      .map(({status}) =>
        status === 'correct' ? '🟩' : status === 'misplaced' ? '🟧' : '⬛'
      )
      .join('');
    board.push(squares);
  }
  return board.join('\n');
};
