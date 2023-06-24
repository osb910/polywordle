import Header from './components/Header';
import Game from './components/Game';
import './App.css';
import {createGlobalStyle} from 'styled-components';
import headerL10n from './l10n/header-l10n';
import useUpdateHead from './hooks/use-update-head';
import useLocalizer from './components/Localizer/use-localizer';

const App = () => {
  const {lang} = useLocalizer();
  const l10n = headerL10n[lang];
  useUpdateHead(lang, l10n.title);
  return (
    <div className={`${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      <AppStyles />
      <Header />
      <Game />
    </div>
  );
};

const AppStyles = createGlobalStyle`
html {

  overflow-y: scroll;

  --game-spacing: 24px;
  --header-height: 4rem;

  --color-gray-100: hsl(0deg 0% 10%);
  --color-gray-300: hsl(0deg 0% 25%);
  --color-gray-500: hsl(0deg 0% 50%);
  --color-gray-700: hsl(0deg 0% 75%);
  --color-gray-900: hsl(0deg 0% 90%);
  
  --color-notice: hsl(235deg 100% 50%);
  --color-notice-bg: hsl(235deg 0% 95%);
  --color-warning: hsl(35deg 85% 45%);
  --color-warning-bg: hsl(40deg 90% 93%);
  --color-success: hsl(125deg 70% 35%);
  --color-success-bg: hsl(120deg 90% 93%);
  --color-error: hsl(345deg 80% 50%);
  --color-error-bg: hsl(350deg 90% 95%);

  --shadow-color: 250deg 35% 11%;
  /* prettier-ignore */
  --shadow-elevation-low:
  0px 0.6px 0.6px hsl(var(--shadow-color) / 0.26),
  0px 0.8px 0.8px -1.6px hsl(var(--shadow-color) / 0.22),
  0px 1.8px 1.8px -3.2px hsl(var(--shadow-color) / 0.19);
  /* prettier-ignore */
  --shadow-elevation-medium:
  0px 0.3px 0.6px hsl(var(--shadow-color) / 0.2),
  0px 0.7px 1.4px -1.1px hsl(var(--shadow-color) / 0.19),
  0px 1.5px 3.7px -2.1px hsl(var(--shadow-color) / 0.18),
  0.1px 4px 9.2px -3.2px hsl(var(--shadow-color) / 0.17),
  0.2px 6px 15px -2.3px hsl(var(--shadow-color) / 0.16);
  /* prettier-ignore */
  --shadow-elevation-high:
    0px 0.6px 0.6px hsl(var(--shadow-color) / 0.26),
    0px 1.8px 1.8px -0.5px hsl(var(--shadow-color) / 0.24),
    0px 3.2px 3.3px -0.9px hsl(var(--shadow-color) / 0.23),
    0.1px 5.4px 5.5px -1.4px hsl(var(--shadow-color) / 0.21),
    0.1px 9.1px 9.3px -1.8px hsl(var(--shadow-color) / 0.2),
    0.2px 14.7px 15px -2.3px hsl(var(--shadow-color) / 0.19),
    0.3px 22.8px 23.3px -2.7px hsl(var(--shadow-color) / 0.17),
    0.4px 34.2px 34.9px -3.2px hsl(var(--shadow-color) / 0.16);

  padding-inline: 2em;
  display: flex;
  flex-direction: column;
  min-block-size: 100%;
  block-size: 100vh;
  transition: all 400ms ease;
  font-family: 'Atkinson', sans-serif;
  padding: 0;
}

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--game-spacing);
    padding: var(--game-spacing);
    margin: 0.25em auto;
    min-inline-size: 250px;
    max-inline-size: min(500px, 58vh, 100%);
  }

  .rtl {
    direction: rtl;
    font-family: 'Lotus';
    font-size: 1.15rem;
  }

  .rtl :where(h1, h2, h3, h4, h5, h6) {
    font-family: 'Uthman Taha';
  }

  @media (max-height: 600px) {
    --game-spacing: 8px;
  }

  button {
    margin: 0;
    border: none;
    cursor: pointer;
    color: inherit;
  }

  [data-reach-dialog-content] {
    position: relative;
    border-radius: 8px;
    padding: 24px 32px;
  }

  .modal-close-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;
    cursor: pointer;
  }

  .modal-title {
    margin-bottom: 0.5em;
  }
`;

export default App;
