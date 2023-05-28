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
