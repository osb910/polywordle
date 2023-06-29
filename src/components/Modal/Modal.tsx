import {useState, useEffect, ReactNode, useCallback} from 'react';
import {X as Close} from 'react-feather';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import VisuallyHidden from '../VisuallyHidden';
import Wrapper from './StyledModal';

export interface ModalProps {
  title: string;
  dismiss: Function;
  dismissText: string;
  children: ReactNode;
  lang?: string;
}

const Modal = ({
  title,
  dismiss,
  dismissText = 'Dismiss Modal',
  children,
  lang,
}: ModalProps) => {
  const [exiting, setExiting] = useState<boolean>(false);
  const animationDuration = 618;

  const smoothlyDismiss = useCallback(() => {
    setExiting(true);
    const timer = setTimeout(() => {
      setExiting(false);
      dismiss();
    }, animationDuration);
    return () => clearTimeout(timer);
  }, [dismiss]);

  useEffect(() => {
    const handleKeyDown = ({key}: {key: string}) => {
      key === 'Escape' && smoothlyDismiss();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dismiss]);

  const style: {[key: string]: any} = {
    '--animation-duration': animationDuration,
  };

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <Wrapper style={style}>
          <div
            className={`backdrop ${exiting ? 'exiting' : ''}`}
            onClick={smoothlyDismiss}
          />
          <div
            className={`modal ${exiting ? 'exiting' : ''} ${
              lang === 'ar' ? 'rtl' : 'ltr'
            }`}
            role='dialog'
            aria-modal='true'
            aria-label={title}
          >
            <button
              type='button'
              className='dismissBtn'
              onClick={smoothlyDismiss}
            >
              <VisuallyHidden>{dismissText}</VisuallyHidden>
              <Close />
            </button>
            {children}
          </div>
        </Wrapper>
      </RemoveScroll>
    </FocusLock>
  );
};

export default Modal;
