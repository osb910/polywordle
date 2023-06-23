'use client';

import {Volume2, VolumeX} from 'react-feather';
import useSoundEnabled from './sound-enabled';
import VisuallyHidden from '../VisuallyHidden';
import IconButton from '../IconButton';

const SoundToggler = ({dir}: {dir?: string}) => {
  const {soundEnabled, toggleSound} = useSoundEnabled();

  return (
    <IconButton
      onClick={() => toggleSound()}
      icon={soundEnabled ? <Volume2 /> : <VolumeX />}
      className={dir}
      highlightDeps={[soundEnabled]}
    >
      <VisuallyHidden>
        {soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
      </VisuallyHidden>
    </IconButton>
  );
};

export default SoundToggler;
