import {useContext, useState} from 'react';
import styled from 'styled-components';
import {Settings} from 'react-feather';
import AppContext from '../../context/app-context';
import Portal from '../Portal';
import Modal from '../Modal';
import Translator from '../Translator';
import IconButton from '../IconButton';
import SettingsPage from '../SettingsPage/SettingsPage';
import headerL10n from '../../l10n/header-l10n';

const Header = ({className}: {className?: string}) => {
  const {lang} = useContext(AppContext);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const l10n = headerL10n[lang];

  const openSettings = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);

  return (
    <header className={className}>
      <h1>{l10n.logo}</h1>
      <section className='settings app'>
        <Translator
          langs={[
            {
              name: 'English',
              code: 'en',
            },
            {
              name: 'العربية',
              code: 'ar',
            },
          ]}
        />
      </section>
      <section className='settings game'>
        <IconButton
          clickHandler={openSettings}
          icon={<Settings />}
          highlightDeps={[showSettings]}
        />
      </section>
      {showSettings && (
        <Portal>
          <Modal
            title={l10n.settings}
            dismiss={closeSettings}
            dismissText={l10n.dismissSettings}
            lang={lang}
          >
            <SettingsPage dismiss={closeSettings} />
          </Modal>
        </Portal>
      )}
    </header>
  );
};

const StyledHeader = styled(Header)`
  padding-block: 0.5em;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  grid-template-areas: 'app-settings title game-settings';
  align-items: center;
  border-bottom: 1px solid var(--color-gray-700);
  color: var(--color-gray-300);

  & .side {
    width: var(--header-height);
    display: grid;
    place-content: center;
  }

  & h1 {
    grid-area: title;
    font-size: 2rem;
    text-align: center;
    padding: 0;
  }

  & .settings {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .settings.app {
    grid-area: app-settings;
  }

  & .settings.game {
    grid-area: game-settings;
  }

  & .settings-modal {
    width: 100%;
    min-width: 500px;
    max-block-size: 80vh;
    background-color: navy;
  }

  @media (max-width: 25rem) {
    font-size: 1.25rem;
  }
`;

export default StyledHeader;
