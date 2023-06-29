import {ReactNode} from 'react';
// @ts-ignore
import useSound from 'use-sound';
import useSoundEnabled from '../SoundToggler/sound-enabled';
// @ts-ignore
import styles from './IconButton.module.css';

export type IconButtonProps = {
  icon: JSX.Element;
  children?: ReactNode;
  className?: string;
  clickHandler?: Function;
  highlightDeps?: any[];
  [x: string]: any;
};

const IconButton = ({
  icon,
  children,
  className,
  clickHandler,
  highlightDeps,
  ...delegated
}: IconButtonProps) => {
  const {soundEnabled} = useSoundEnabled();
  const [playActive] = useSound('/sfx/pop-down.mp3', {
    soundEnabled,
    volume: 0.25,
  });
  const [playOn] = useSound('/sfx/pop-up-on.mp3', {soundEnabled, volume: 0.25});

  return (
    // @ts-ignore
    <button
      className={`${className ?? ''} bump ${styles.button}`}
      onClick={() => clickHandler?.()}
      onMouseDown={() => playActive()}
      onMouseUp={() => playOn()}
      key={highlightDeps?.join('')}
      {...delegated}
    >
      {icon}
      {children}
    </button>
  );
};

export default IconButton;
