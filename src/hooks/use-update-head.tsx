import {useEffect} from 'react';

const useUpdateHead = (lang: string, title: string) => {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir =
      lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr';
    document.title = title ?? document.title;
  }, [lang, title]);
};

export default useUpdateHead;
