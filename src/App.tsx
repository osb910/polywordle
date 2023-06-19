import {FC} from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Game from './components/Game';
import './App.css';
import {useContext} from 'react';
import AppContext from './context/app-context';

const App: FC<{className?: string}> = ({className}) => {
  const {lang} = useContext(AppContext);
  return (
    <div className={`${className} ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header />
      <main>
        <Game />
      </main>
    </div>
  );
};

const StyledApp = styled(App)`
  overflow-y: scroll;

  --game-spacing: 24px;
  --header-height: 4rem;

  --color-success: hsl(150deg 70% 30%);
  --color-warning: hsl(50deg 100% 30%);
  --color-error: hsl(0deg 70% 45%);
  --color-gray-100: hsl(0deg 0% 10%);
  --color-gray-300: hsl(0deg 0% 25%);
  --color-gray-500: hsl(0deg 0% 50%);
  --color-gray-700: hsl(0deg 0% 75%);
  --color-gray-900: hsl(0deg 0% 90%);

  padding-inline: 2em;
  display: flex;
  flex-direction: column;
  min-block-size: 100%;
  block-size: 100vh;
  transition: all 400ms ease;
  font-family: sans-serif;
  padding: 0;

  & > main {
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

  @media (max-height: 600px) {
    --game-spacing: 8px;
  }

  button {
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: inherit;
  }

  & [data-reach-dialog-content] {
    position: relative;
    border-radius: 8px;
    padding: 24px 32px;
  }

  & .modal-close-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;
    cursor: pointer;
  }

  & .modal-title {
    margin-bottom: 0.5em;
  }
`;

export default StyledApp;
