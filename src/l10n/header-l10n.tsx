interface LangText {
  [key: string]: any;
}

const headerL10n: {[key: string]: LangText} = {
  en: {
    logo: 'Wordle',
    logoAlt: 'Guess the word',
    title: 'Wordle Game',
    settings: 'Settings',
    dismissSettings: 'Close Settings',
    save: 'Save',
    resetPrompt: 'This resets the game. Continue?',
    language: 'Language',
    howToPlay: 'How To Play',
    gameRules: [
      'Guess the wordle in a given number of tries, usually 6.',
      'Each guess must be a valid word with a certain number of letters.',
      'The color of the tiles will change to show how close your guess was to the word.',
      'You can change the number of tries and letters per word ⚙️.',
      'You can play in English or Arabic 🌐.',
    ].map((item, idx) => <li key={idx}>{item}</li>),
    examples: 'Examples',
    exampleGuesses: [
      {
        word: [
          {
            letter: 'W',
            status: 'correct',
          },
          {
            letter: 'E',
            status: '',
          },
          {
            letter: 'A',
            status: '',
          },
          {
            letter: 'R',
            status: '',
          },
          {
            letter: 'Y',
            status: '',
          },
        ],
        explanation: (
          <p>
            <strong>W</strong> is in the word and in the correct spot.
          </p>
        ),
      },
      {
        word: [
          {
            letter: 'P',
            status: '',
          },
          {
            letter: 'I',
            status: 'misplaced',
          },
          {
            letter: 'L',
            status: '',
          },
          {
            letter: 'L',
            status: '',
          },
          {
            letter: 'S',
            status: '',
          },
        ],
        explanation: (
          <p>
            <strong>I</strong> is in the word but in the wrong spot.
          </p>
        ),
      },
      {
        word: [
          {
            letter: 'V',
            status: '',
          },
          {
            letter: 'A',
            status: '',
          },
          {
            letter: 'G',
            status: '',
          },
          {
            letter: 'U',
            status: 'incorrect',
          },
          {
            letter: 'E',
            status: '',
          },
        ],
        explanation: (
          <p>
            <strong>U</strong> is not in the word in any spot.
          </p>
        ),
      },
    ],
    credit: (
      <p>
        This is a multilingual customizable version of Wordle created and
        localized by{' '}
        <a
          href='https://github.com/osb910/polywordle'
          target='_blank'
          rel='noreferrer'
        >
          Omar
        </a>
        .
      </p>
    ),
    help: 'Help',
    resetBtn: 'Reset',
  },
  ar: {
    logo: 'الـوِرد',
    logoAlt: 'خمِّن الورد',
    title: 'لعبة الـوِرد',
    settings: 'الضبط',
    dismissSettings: 'أغلِق الضبط',
    save: 'احفظ',
    resetPrompt: 'هذا يصفّر اللعبة، هل نتابع؟',
    language: 'اللغة',
    howToPlay: 'طريقة اللعب',
    gameRules: [
      'خمِّن الوِرد في عدد من المحاولات أوسطها ستة.',
      'لا بد للتخمينة أن تكون كلمة صحيحة من عدد من الأحرف.',
      'يتغير لون كل خانة بحسب قرب تخمينك من الكلمة.',
      'تستطيع تغيير عدد المحاولات وعدد أحرف الكلمة لكل لعبة ⚙️.',
      'يسعك أن تلعب بالعربية والإنجليزية 🌐.',
    ].map((item, idx) => <li key={idx}>{item}</li>),
    examples: 'أمثلة',
    exampleGuesses: [
      {
        word: [
          {
            letter: 'م',
            status: 'correct',
          },
          {
            letter: 'ي',
            status: '',
          },
          {
            letter: 'س',
            status: '',
          },
          {
            letter: 'ر',
            status: '',
          },
          {
            letter: 'ة',
            status: '',
          },
        ],
        explanation: (
          <p>
            حرف <strong>الميم</strong> في الكلمة وموضعه صحيح.
          </p>
        ),
      },
      {
        word: [
          {
            letter: 'إ',
            status: '',
          },
          {
            letter: 'ق',
            status: '',
          },
          {
            letter: 'ب',
            status: '',
          },
          {
            letter: 'ا',
            status: 'misplaced',
          },
          {
            letter: 'ل',
            status: '',
          },
        ],
        explanation: (
          <p>
            حرف <strong>الألف</strong> في الكلمة وموضعه غير صحيح.
          </p>
        ),
      },
      {
        word: [
          {
            letter: 'غ',
            status: '',
          },
          {
            letter: 'ض',
            status: 'incorrect',
          },
          {
            letter: 'ن',
            status: '',
          },
          {
            letter: 'ف',
            status: '',
          },
          {
            letter: 'ر',
            status: '',
          },
        ],
        explanation: (
          <p>
            حرف <strong>الضاد</strong> ليس في الكلمة مطلقًا.
          </p>
        ),
      },
    ],
    credit: (
      <p>
        هذه نسخة من الوِرد متعددة اللغات والخيارات قام بإنشائها وتوطينها{' '}
        <a
          href='https://github.com/osb910/polywordle'
          target='_blank'
          rel='noreferrer'
        >
          عُمر
        </a>
        .
      </p>
    ),
    help: 'تعريف',
    resetBtn: 'صفِّر',
  },
};

export default headerL10n;
