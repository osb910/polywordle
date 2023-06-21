interface LangText {
  [key: string]: any;
}

const gameL10n: {[key: string]: LangText} = {
  en: {
    inputLabel: 'Type your guess:',
    keyboard: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '⌫'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⮐'],
    ],
    ok: 'OK',
    reset: 'Play again',
    wonMessage: (step: number): JSX.Element => {
      return (
        <p>
          <strong>Congratulations!</strong> Got it in{' '}
          <strong>
            {step} guess{step > 1 && 'es'}
          </strong>
          .
        </p>
      );
    },
    lostMessage: (word: string): JSX.Element => {
      return (
        <p>
          Sorry, the correct wordle is <strong>«{word}»</strong>.
        </p>
      );
    },
    unknownWord: 'Not in the word list',
    numOfAttempts: 'Number of attempts',
    lettersPerWord: 'Letters per word',
  },
  ar: {
    inputLabel: 'اكتب تخمينك:',
    keyboard: [
      ['د', 'ج', 'ح', 'خ', 'هـ', 'ع', 'غ', 'ف', 'ق', 'ث', 'ص', 'ض', 'ذ'],
      ['ط', 'ك', 'م', 'ن', 'ت', 'أ', 'ا', 'إ', 'ل', 'ب', 'ي', 'س', 'ش'],
      ['⌦', 'ظ', 'ز', 'و', 'ة', 'ى', 'ر', 'ؤ', 'ء', 'ئ', '⮑'],
    ],
    ok: 'تمام',
    reset: 'أعِد اللعبة',
    wonMessage: (step: number): JSX.Element => {
      return (
        <p>
          <strong>مبارك!</strong> قد حللتها من{' '}
          <strong>
            {step === 1
              ? 'أول'
              : step === 2
              ? 'ثاني'
              : step === 3
              ? 'ثالث'
              : step === 4
              ? 'رابع'
              : step === 5
              ? 'خامس'
              : step === 6
              ? 'سادس'
              : step === 7
              ? 'سابع'
              : step === 8
              ? 'ثامن'
              : step === 9
              ? 'تاسع'
              : step === 10
              ? 'عاشر'
              : ''}{' '}
            تخمينة
          </strong>
          .
        </p>
      );
    },
    lostMessage: (word: string): JSX.Element => {
      return (
        <p>
          معذرةً، الورد الصحيح هو <strong>«{word}»</strong>.
        </p>
      );
    },
    unknownWord: 'ليست عندنا',
    numOfAttempts: 'عدد المحاولات',
    lettersPerWord: 'عدد أحرف الكلمة',
  },
};

export default gameL10n;
