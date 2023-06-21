export type Language = {
  name: string;
  code: string;
  dir?: 'rtl' | 'ltr';
};

const languages: Language[] = [
  {
    name: 'العربية',
    code: 'ar',
    dir: 'rtl',
  },
  {
    name: 'English',
    code: 'en',
    dir: 'ltr',
  },
];

export default languages;
