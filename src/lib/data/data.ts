import arabicWordles from './data.ar';
import englishWordles from './data.en';
import frenchWordles from './data.fr';

type Wordles = {
  [key: string]: {[key: number]: string[]};
};

const WORDLES: Wordles = {
  ar: arabicWordles,
  en: englishWordles,
  fr: frenchWordles,
};

export default WORDLES;
