import styled, {createGlobalStyle} from 'styled-components';
import Header from './components/Header';
import Game from './components/Game';
import './App.css';
import {useContext} from 'react';
import AppContext from './lib/app-context';

const GlobalStyle = createGlobalStyle`
  html {
    overflow-y: scroll;

    --game-spacing: 32px;
    --header-height: 4rem;

    --color-success: hsl(150deg 70% 30%);
    --color-warning: hsl(50deg 100% 30%);
    --color-error: hsl(0deg 70% 45%);
    --color-gray-100: hsl(0deg 0% 10%);
    --color-gray-300: hsl(0deg 0% 25%);
    --color-gray-500: hsl(0deg 0% 50%);
    --color-gray-700: hsl(0deg 0% 75%);
    --color-gray-900: hsl(0deg 0% 90%);
  }

  body {
    font-family: sans-serif;
    padding: 0;
  }

  @media (max-height: 600px) {
    body {
      --game-spacing: 8px;
    }
  }

  button {
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: inherit;
  }

  & .visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
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

  /*
    Keyframe animations
  */
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;

const App = ({className}) => {
  const {lang} = useContext(AppContext);
  return (
    <div className={`${className} ${lang === 'ar' ? 'rtl' : ''}`}>
      <GlobalStyle />
      <Header />
      <main>
        <Game />
      </main>
    </div>
  );
};

const StyledApp = styled(App)`
  padding-inline: 2em;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100vh;
  transition: all 400ms ease;

  & > main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--game-spacing);
    padding: var(--game-spacing) 32px;
    margin: 0 auto;
    min-width: 250px;
    max-width: min(500px, 58vh, 100%);
  }

  &.rtl {
    direction: rtl;
    font-family: 'Lotus';
    font-size: 1.15rem;
  }

  :not(.rtl) :where(h1, h2, h3, h4, h5, h6) {
    font-family: 'PT Serif', serif;
  }

  &.rtl :where(h1, h2, h3, h4, h5, h6) {
    font-family: 'Uthman Taha';
  }
`;

export default StyledApp;
