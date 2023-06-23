'use client';

import {useEffect, ReactNode} from 'react';
import {AlertOctagon, AlertTriangle, CheckCircle, Info, X} from 'react-feather';
import StyledToast from './StyledToast';
// @ts-ignore';
import styles from './Toast.module.css';

import VisuallyHidden from '../VisuallyHidden';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

interface ToastProps {
  variant: 'notice' | 'warning' | 'success' | 'error';
  dismiss: () => void;
  delay?: number;
  children: ReactNode;
}

const Toast = ({variant, dismiss, delay = 60000, children}: ToastProps) => {
  const Icon = ICONS_BY_VARIANT[variant];
  useEffect(() => {
    const timeout = setTimeout(() => {
      dismiss();
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, dismiss]);

  return (
    <StyledToast onClick={dismiss} className={`${variant}`}>
      <section className={`iconContainer`}>
        <Icon size={24} />
      </section>
      <section className={`content`}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </section>
      <button
        className={`closeButton`}
        onClick={dismiss}
        aria-label='Dismiss message'
        aria-live='off'
      >
        <X size={24} />
      </button>
    </StyledToast>
  );
};

export default Toast;
