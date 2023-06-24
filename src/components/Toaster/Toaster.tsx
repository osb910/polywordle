'use client';

import Portal from '../Portal';
import Toast from './Toast';
import useToaster from './use-toaster';
import StyledToaster from './StyledToaster';
// @ts-ignore
import styles from './Toaster.module.css';
import useLocalizer from '../Localizer/use-localizer';

const Toaster = () => {
  const {toasts, dismissToast} = useToaster();
  const {lang} = useLocalizer();
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
