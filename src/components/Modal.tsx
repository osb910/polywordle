import {useState, useEffect, ReactNode, useCallback} from 'react';
import styled from 'styled-components';
import {X as Close} from 'react-feather';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import VisuallyHidden from './VisuallyHidden';
import {appear, disappear} from './animations/keyframes';

interface ModalProps {
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
  const [dismissing, setDismissing] = useState<boolean>(false);

  const handleDismiss = useCallback(() => {
    setDismissing(true);
    const timer = setTimeout(() => {
      setDismissing(false);
      dismiss();
    }, 400);
    return () => clearTimeout(timer);
  }, [dismiss]);

  useEffect(() => {
    const handleKeyDown = ({key}: {key: string}) => {
      key === 'Escape' && handleDismiss();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dismiss]);

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <Wrapper>
          <div className='backdrop' onClick={handleDismiss} />
          <div
            className={`modal ${dismissing ? 'dismissing' : ''} ${
              lang === 'ar' ? 'rtl' : 'ltr'
            }`}
            role='dialog'
            aria-modal='true'
            aria-label={title}
          >
            <button
              type='button'
              className='dismissBtn'
              onClick={handleDismiss}
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

const Wrapper = styled.aside`
  position: fixed;
  inset: 0;
  display: grid;
  place-content: center;
  padding: 1em;
  transition: all 400ms ease-in-out;

  & .backdrop {
    position: absolute;
    inset: 0;
    background: hsl(0deg 0% 0% / 0.75);
  }

  & .modal {
    max-block-size: 85vh;
    position: relative;
    background: white;
    border-radius: 0.5rem;
    padding: 1.5em;
    animation: ${appear} 350ms ease-in-out both;
    font-family: 'Atkinson', sans-serif;
  }

  & .modal.rtl {
    font-family: 'Calibri', sans-serif;
  }

  & .dismissing {
    animation: ${disappear} 350ms ease-in-out both;
  }

  & .dismissBtn {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    padding: 1em;
    color: white;
    background-color: transparent;
    border: none;
    transform: translateY(-100%);
    cursor: pointer;
  }
`;

export default Modal;
