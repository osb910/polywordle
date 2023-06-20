import {ReactNode} from 'react';
import styled from 'styled-components';
import {slideDown} from '../../animations/keyframes';

interface BannerProps {
  className?: string;
  status: 'happy' | 'sad' | 'warning';
  children: ReactNode;
}

const Banner = ({className, status, children}: BannerProps) => {
  return <aside className={`${status} ${className}`}>{children}</aside>;
};

const StyledBanner = styled(Banner)`
  position: fixed;
  z-index: 1;
  inset-inline: 0;
  top: 0rem;
  width: 90%;
  max-width: fit-content;
  margin: 0 auto;
  padding: 0.75em;
  text-align: center;
  animation: 1.25s cubic-bezier(0, 0.72, 0.24, 1.02) both ${slideDown};
  border-radius: 0px 0px 4px 4px;
  will-change: transform;
  filter: drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.15));

  &.happy {
    background: var(--color-success);
    color: white;
  }

  &.sad {
    background: var(--color-error);
    color: white;
  }

  &.warning {
    background: var(--color-warning);
    color: white;
  }

  &:where(.happy, .sad) {
    animation-delay: 2.25s;
  }

  & button {
    padding: 0.2em 0.4em;
    margin-block: 0.25em 0;
    background-color: transparent;
    border: 1px solid;
    border-radius: 4px;
    font-size: 1.125rem;
    transition: all 300ms ease-in-out;
  }

  & button:where(:hover, :focus-visible) {
    background-color: var(--color-gray-100);
  }
`;

export default StyledBanner;
