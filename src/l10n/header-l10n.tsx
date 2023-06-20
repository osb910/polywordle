interface LangText {
  [key: string]: any;
}

const headerL10n: {[key: string]: LangText} = {
  en: {
    logo: 'Wordle',
    logoAlt: 'Guess the word',
    signup: 'Signup',
    login: 'Login',
    logout: 'Logout',
    settings: 'Settings',
    dismissSettings: 'Close Settings',
    save: 'Save',
    resetPrompt: 'This resets the game. Continue?',
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
    dismissSettings: 'أغلِق الضبط',
    save: 'احفظ',
    resetPrompt: 'هذا يصفّر اللعبة، هل نتابع؟',
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

export default headerL10n;