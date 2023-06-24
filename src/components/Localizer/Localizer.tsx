import {MouseEvent} from 'react';
import {Globe} from 'react-feather';
import useLocalizer from './use-localizer';
import useUpdateHead from '../../hooks/use-update-head';
import IconButton from '../IconButton';
import headerL10n from '../../l10n/header-l10n';
import {Language} from '../../l10n/languages';
// @ts-ignore
import styles from './Localizer.module.css';

export interface TranslatorProps {
  langs: Language[];
  langDisplay?: string;
  className?: string;
}

const Translator = ({langs, langDisplay, className}: TranslatorProps) => {
  const {lang, translate} = useLocalizer();
  let l10n = headerL10n[lang];

  useUpdateHead(lang, l10n.title);

  const changeLang = (evt: MouseEvent<HTMLLIElement>): void => {
    const newLang = (evt.target as HTMLLIElement).dataset.lang;
    if (!newLang || lang === newLang) return;
    const confirmReset = confirm(l10n.resetPrompt);
    confirmReset && translate(newLang);
    l10n = headerL10n[newLang];
  };

  return (
    <IconButton
      icon={<Globe />}
      className={`${className} ${styles.localizer}`}
      highlightDeps={[lang]}
      title={l10n.language}
    >
      {langDisplay && (
        <div className={`${styles.currentLang} current-lang`}>
          {langDisplay}
        </div>
      )}
      <ul className={styles.langs}>
        {langs.map(({name, code}) => (
          <li
            className={`${styles.lang} ${
              code === lang ? `${styles.selected} selected` : ''
            }`}
            data-lang={code}
            key={code}
            onClick={changeLang}
          >
            {name}
          </li>
        ))}
      </ul>
    </IconButton>
  );
};

export default Translator;
