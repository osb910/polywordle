import {useContext, useState, FormEvent} from 'react';
import GameContext from '../Game/game-context';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button/Button';
import headerL10n from '../../l10n/header-l10n';
import gameL10n from '../../l10n/game-l10n';
import useLocalizer from '../Localizer/use-localizer';

type SettingsPageProps = {
  dismiss?: Function;
};

const SettingsPage = ({dismiss}: SettingsPageProps) => {
  const {numOfAttempts, setNumOfAttempts, lettersPerWord, setLettersPerWord} =
    useContext(GameContext);
  const {lang} = useLocalizer();
  const [newNumOfAttempts, setNewNumOfAttempts] =
    useState<number>(numOfAttempts);
  const [newLettersPerWord, setNewLettersPerWord] =
    useState<number>(lettersPerWord);
  const l10n = {...headerL10n[lang], ...gameL10n[lang]};

  const saveSettings = (evt: FormEvent): void => {
    evt.preventDefault();
    if (
      newNumOfAttempts === numOfAttempts &&
      newLettersPerWord === lettersPerWord
    )
      return;
    const confirmReset = confirm(l10n.resetPrompt);
    if (!confirmReset) return;
    setNumOfAttempts(newNumOfAttempts);
    setLettersPerWord(newLettersPerWord);
    dismiss?.();
  };

  return (
    <Wrapper>
      <h1>{l10n.settings}</h1>
      <form onSubmit={saveSettings}>
        <Input
          label={l10n.numOfAttempts}
          type='number'
          id='numOfAttempts'
          min={4}
          max={10}
          value={newNumOfAttempts}
          setInput={setNewNumOfAttempts}
        />
        <Input
          label={l10n.lettersPerWord}
          type='number'
          id='lettersPerWord'
          min={3}
          max={7}
          value={newLettersPerWord}
          setInput={setNewLettersPerWord}
        />
        <Button variant='fill' size='medium' type='submit'>
          {l10n.save}
        </Button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-inline-size: 250px;
  max-inline-size: 500px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  background-color: #e6e6e6;
  border-radius: inherit;
  transition: all 400ms ease;

  & h1 {
    font-size: 2rem;
    font-weight: 700;
  }

  & form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    min-inline-size: 300px;
  }

  & p {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5em;
    font-size: 1.125rem;
    align-items: center;
    font-family: inherit;
  }

  & p input {
    width: 2.75rem;
    text-align: start;
    outline-offset: 4px;
  }

  & button[type='submit'] {
    align-self: center;
  }
`;

export default SettingsPage;
