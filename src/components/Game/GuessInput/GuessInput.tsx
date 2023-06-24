import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useId,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import styled from 'styled-components';
import GameContext from '../game-context';
import {ClickEvent} from './Keyboard/KeyButton';
import Keyboard from './Keyboard';
import Button from '../../Button';
import {
  addGuess,
  checkGuess,
  fillGuess,
  getWordleBoard,
} from '../../../lib/game-logic';
import gameL10n from '../../../l10n/game-l10n';
import WORDLES from '../../../lib/data/data';
import useToaster from '../../Toaster/use-toaster';
// @ts-ignore
import useSound from 'use-sound';
import useSoundEnabled from '../../SoundToggler/sound-enabled';
import useLocalizer from '../../Localizer/use-localizer';

interface GuessInputProps {
  className?: string;
}

const GuessInput = ({className}: GuessInputProps) => {
  const [guessInput, setGuessInput] = useState<string>('');
  const [evaluating, setEvaluating] = useState<boolean>(false);
  const {lang} = useLocalizer();
  const {createToast} = useToaster();
  const {
    guesses,
    setGuesses,
    wordle,
    gameOver,
    gameWon,
    setGameOver,
    setGameWon,
    step,
    setStep,
    resetGame,
    numOfAttempts,
    lettersPerWord,
  } = useContext(GameContext);
  const id = useId();
  const {soundEnabled} = useSoundEnabled();
  const [playShuffle] = useSound('/shuffling-cards.mp3', {
    soundEnabled,
    playbackRate: 0.9,
    volume: 0.5,
  });
  const [playCongrats] = useSound('/fanfare.mp3', {
    soundEnabled,
    volume: 0.5,
  });
  const [playHardLuck] = useSound('/dun-dun-dun.mp3', {
    soundEnabled,
    volume: 0.5,
  });
  const [playWarning] = useSound('/warning.mp3', {
    soundEnabled,
    volume: 0.5,
  });
  const [playTyping] = useSound('/typing.mp3', {
    soundEnabled,
    volume: 0.5,
  });

  const l10n = gameL10n[lang];
  const WORDS = WORDLES[lang][lettersPerWord];

  useEffect(() => {
    if (!gameOver || evaluating) return;
    const ResetButton = () => (
      <Button
        className='resetBtn'
        variant='outline'
        size='small'
        onClick={() => resetGame(lang)}
      >
        {l10n.reset}
      </Button>
    );
    createToast(
      gameWon ? 'success' : 'error',
      <>
        {gameWon
          ? l10n.wonMessage(Math.min(step, numOfAttempts))
          : l10n.lostMessage(wordle)}
        <ResetButton />
      </>
    );
    gameWon ? playCongrats() : playHardLuck();
  }, [gameOver, gameWon, evaluating]);

  const changeGuess = useCallback(
    (value: string): void => {
      const input = value.toUpperCase();
      if (lang === 'ar' && /[^\p{Script=Arabic}]/u.test(input)) return;
      if (lang === 'en' && /[^A-Za-z]/.test(input)) return;
      playTyping();
      setGuessInput(input);
      const newGuesses = fillGuess(guesses, input, step);
      setGuesses(newGuesses);
    },
    [guesses, lang, setGuesses, step]
  );

  const submitGuess = useCallback((): Function | undefined => {
    if (guessInput.length < wordle.length) return;
    if (!WORDS.includes(guessInput)) {
      playWarning();
      createToast('warning', l10n.unknownWord);
      changeGuess('');
      return;
    }

    const word = checkGuess(guessInput, wordle);
    const newGuesses = addGuess(guesses, word, step);
    setGuesses(newGuesses);

    playShuffle();
    setEvaluating(true);
    setGuessInput('');
    const timeoutId = setTimeout(() => {
      setEvaluating(false);
    }, lettersPerWord * 400 + 600);

    if (guessInput === wordle) {
      setGameWon(true);
      setGameOver(true);
      console.log(getWordleBoard(newGuesses, step));
      return;
    }

    setStep(step + 1);

    if (step === numOfAttempts) {
      setGameOver(true);
    }

    return () => clearTimeout(timeoutId);
  }, [
    guessInput,
    WORDS,
    guesses,
    numOfAttempts,
    step,
    wordle,
    changeGuess,
    l10n.unknownWord,
  ]);

  const handleKeyDown = useCallback(
    (evt: ClickEvent): void => {
      let {key} = evt;
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
        // key === 'Enter' && resetGame(lang);
        return;
      }

      if (key === 'Enter') {
        if (guessInput.length < lettersPerWord) return;
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
    window.addEventListener(
      'keydown',
      handleKeyDown as unknown as (evt: Event) => void
    );
    return () =>
      window.removeEventListener(
        'keydown',
        handleKeyDown as unknown as (evt: Event) => void
      );
  }, [handleKeyDown]);

  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        submitGuess();
      }}
      className={className}
    >
      <label htmlFor={`${id}-guess-input`}>{l10n.inputLabel}</label>
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
        onChange={(evt: ChangeEvent) =>
          changeGuess((evt.target as HTMLInputElement).value)
        }
        onKeyDown={(evt: KeyboardEvent) =>
          /^(Enter|Backspace|[\p{L}])$/iu.test(evt.key) && evt.stopPropagation()
        }
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
    inline-size: 60%;
    max-inline-size: 300px;
    min-inline-size: 200px;
    block-size: 2.5rem;
    font-size: 1.5rem;
    border: 2px solid var(--color-gray-300);
    border-radius: 4px;
    padding-block: 0.25em;
    padding-inline: 0.5em;
    outline-offset: 4px;
    outline-color: navy;
    text-align: center;
  }
`;

export default StyledGuessInput;
