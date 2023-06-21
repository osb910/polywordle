import {useEffect, ReactNode} from 'react';
import {AlertOctagon, AlertTriangle, CheckCircle, Info, X} from 'react-feather';
import styled, {css} from 'styled-components';
import {slideInX} from '../animations/keyframes';

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
    <Wrapper onClick={dismiss} className={variant}>
      <section className='iconContainer'>
        <Icon size={24} />
      </section>
      <section className='content'>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </section>
      <button
        className='closeButton'
        onClick={dismiss}
        aria-label='Dismiss message'
        aria-live='off'
      >
        <X size={24} />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  color: black;
  color-scheme: light;
  background: white;
  max-width: 100%;
  width: 350px;
  box-shadow: var(--shadow-elevation-medium);
  animation: ${slideInX(101)} 1s cubic-bezier(0, 0.46, 0, 1.04) both;
  will-change: transform;

  .rtl & {
    animation-name: ${slideInX(-101)};
  }

  & .content {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    flex: 1;
    padding: 12px 0px;
    font-weight: 600;
  }

  & .content button {
    ${({className}) => css`
      color: var(--color-${className});
    `}
    border-color: currentColor;
    background-color: transparent;
    transition: transform 0.2s ease-in-out;
  }

  & .content button:where(:hover, :focus) {
    transform: scale(1.1);
  }

  & .iconContainer {
    align-self: flex-start;
    flex-shrink: 0;
    padding: 16px;
  }

  & .iconContainer svg {
    display: block;
  }

  & .closeButton {
    align-self: flex-start;

    flex-shrink: 0;
    border: none;
    background: transparent;
    padding: 16px;
    cursor: pointer;
  }

  &.notice {
    background: var(--color-notice-bg);
  }

  &.notice .iconContainer {
    color: var(--color-notice);
  }

  &.warning {
    background: var(--color-warning-bg);
  }

  &.warning .iconContainer {
    color: var(--color-warning);
  }

  &.success {
    background: var(--color-success-bg);
  }

  &.success .iconContainer {
    color: var(--color-success);
  }

  &.error {
    background: var(--color-error-bg);
  }

  &.error .iconContainer {
    color: var(--color-error);
  }
`;

export default Toast;
