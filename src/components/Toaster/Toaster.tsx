import {useContext} from 'react';
import styled from 'styled-components';

import Portal from '../Portal';
import Toast from './Toast';
import ToastContext from '../../context/toast-context';
import LangContext from '../../context/lang-context';

const Toaster = () => {
  const {toasts, dismissToast} = useContext(ToastContext);
  const {lang} = useContext(LangContext);
  return (
    <Portal lang={lang}>
      <Wrapper
        className='toaster'
        role='region'
        aria-live='polite'
        aria-label='Notification'
      >
        {toasts.map(({id, variant, message, delay}, idx) => (
          <Toast
            key={id}
            variant={variant}
            dismiss={() => dismissToast(idx)}
            delay={delay}
          >
            {message}
          </Toast>
        ))}
      </Wrapper>
    </Portal>
  );
};

const Wrapper = styled.ol`
  position: fixed;
  inset-block-end: 1rem;
  inset-inline-end: 1rem;
  display: flex;
  flex-direction: column-reverse;
  gap: 1em;
  padding: 1em;
  list-style-type: none;
`;

export default Toaster;
