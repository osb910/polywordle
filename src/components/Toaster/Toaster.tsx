'use client';

import {useContext} from 'react';

import Portal from '../Portal';
import Toast from './Toast';
import LangContext from '../../context/lang-context';
import useToaster from './use-toaster';
import StyledToaster from './StyledToaster';
// @ts-ignore
import styles from './Toaster.module.css';

const Toaster = () => {
  const {toasts, dismissToast} = useToaster();
  const {lang} = useContext(LangContext);
  return (
    <Portal lang={lang}>
      <StyledToaster
        className={`toaster`}
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
      </StyledToaster>
    </Portal>
  );
};

export default Toaster;
