'use client';

import {useEffect, ReactNode, useState, useCallback} from 'react';
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
  const [exiting, setExiting] = useState<boolean>(false);

  const smoothlyDismiss = useCallback(() => {
    setExiting(true);
    const timer = setTimeout(() => {
      setExiting(false);
      dismiss();
    }, 1236);
    return () => clearTimeout(timer);
  }, [dismiss]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      smoothlyDismiss();
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, smoothlyDismiss]);

  return (
    <StyledToast
      onClick={smoothlyDismiss}
      className={`${variant} ${exiting ? 'exiting' : ''}`}
    >
      <section className={`iconContainer`}>
        <Icon size={24} />
      </section>
      <section className={`content`}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </section>
      <button
        className={`closeButton`}
        onClick={smoothlyDismiss}
        aria-label='Dismiss message'
        aria-live='off'
      >
        <X size={24} />
      </button>
    </StyledToast>
  );
};

export default Toast;
