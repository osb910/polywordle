import {ReactNode} from 'react';
import Wrapper from './StyledWrapper';
// @ts-ignore
import useSound from 'use-sound';
import useSoundEnabled from '../SoundToggler/sound-enabled';

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
  const [playActive] = useSound('/pop-down.mp3', {soundEnabled, volume: 0.25});
  const [playOn] = useSound('/pop-up-on.mp3', {soundEnabled, volume: 0.25});

  return (
    <Wrapper
      className={`${className ?? ''} bump`}
      onClick={() => clickHandler?.()}
      onMouseDown={playActive}
      onMouseUp={playOn}
      key={highlightDeps?.join('')}
      {...delegated}
    >
      {icon}
      {children}
    </Wrapper>
  );
};

export default IconButton;
