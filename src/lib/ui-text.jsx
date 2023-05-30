const header = {
  en: {
    logo: 'Wordle',
    logoAlt: 'Guess the word',
    signup: 'Signup',
    login: 'Login',
    logout: 'Logout',
    settings: 'Settings',
    resetPrompt: 'Changing language resets the game. Continue?',
    email: 'Email',
    signupEmailText: 'We never share emails.',
    pass: 'Password',
    confirmPass: 'Confirm Password',
    verify: 'Verify',
    userExists: `We know know. Perhaps you'd like to login...`,
    confCode: 'Confirmation Code',
    confCodeText: 'Please check your email for the code.',
    loginSuccess: 'Welcome to your Scratch...',
    alreadyLoggedIn: `You are already logged in...`,
    unconfirmedUserMsg: 'You have to complete your sign up...',
    tooMuchConfReq: 'Too much requests. Try again after 15 minutes.',
    netError: 'Check your network connection.',
    userNotFound: `We don't know you. Come signup...`,
  },
  ar: {
    logo: 'الـوِرد',
    logoAlt: 'خمِّن الورد',
    signup: 'اركب معنا',
    login: 'افتح سِجلَّك',
    logout: 'أغلِق سِجلَّك',
    settings: 'الضبط',
    resetPrompt: 'تغيير اللغة يصفّر اللعبة، هل نتابع؟',
    email: 'بريدك',
    signupEmailText: 'عنوانك محفوظ',
    pass: 'أمارتُك',
    confirmPass: 'أكِّد أمارتَك',
    verify: 'تحقَّق',
    userExists: `إنا نعرفك، لعلك تريد أن تفتح سِجلَّك...`,
    confCode: 'رمز التحقق',
    confCodeText: 'انظر بريدك وأْتِ بالرمز.',
    loginSuccess: 'حياك الله في سِجلِّك...',
    alreadyLoggedIn: `سِجلّك مفتوح، اطّلع عليه...`,
    unconfirmedUserMsg: 'لا بد أن تُتمَّ التسجيل...',
    tooMuchConfReq: 'أكثرتَ الطلب. اصبر ربع ساعة ثم أعِد الكرّة.',
    netError: 'راجع اتصالك بالشبكة.',
    userNotFound: `لا نعرفك، تعالَ واركب معنا...`,
  },
};

const game = {
  en: {
    inputLabel: 'Type your guess:',
    keyboard: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '⌫'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⮐'],
    ],
    ok: 'OK',
    reset: 'Play again',
    wonMessage(step) {
      return (
        <>
          <strong>Congratulations!</strong> Got it in{' '}
          <strong>
            {step} guess{step > 1 && 'es'}
          </strong>
          .
        </>
      );
    },
    lostMessage(word) {
      return (
        <>
          Sorry, the correct wordle is <strong>{word}</strong>.
        </>
      );
    },
    unknownWord: 'Not in the word list',
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
    wonMessage(step) {
      return (
        <>
          <strong>مبارك!</strong> قد حللتها بعد{' '}
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
        </>
      );
    },
    lostMessage(word) {
      return (
        <>
          معذرةً، الورد الصحيح هو <strong>{word}</strong>.
        </>
      );
    },
    unknownWord: 'ليست عندنا',
  },
};

export {header, game};
