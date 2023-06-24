import styled, {css, keyframes} from 'styled-components';

const slideInX = (x?: number) => keyframes`
  from {
    transform: translateX(calc(${101 * (x ?? 1)}%));
  }
`;

const slideOutX = (x?: number) => keyframes`
  40% {
    transform: translateX(${-10 * (x ?? 1)}%);
  }

  to {
    transform: translateX(calc(${101 * (x ?? 1)}% + ${2 * (x ?? 1)}rem));
  }
`;

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
  animation: ${slideInX()} 1s cubic-bezier(0, 0.46, 0, 1.04) both;
  will-change: transform;

  &.exiting {
    animation-name: ${slideOutX()};
  }

  .rtl & {
    animation-name: ${slideInX(-1)};
  }

  .rtl &.exiting {
    animation-name: ${slideOutX(-1)};
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

export default Wrapper;
