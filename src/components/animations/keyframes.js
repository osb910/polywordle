import {keyframes} from 'styled-components';

export const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  
  to {
    transform: translateY(0%);
  }
`;

export const closeGap = keyframes`
  0% {
    gap: 6px;
  }

  20% {
    gap: 5.5px;
  }

  40% {
    gap: 5px;
  }

  60% {
    gap: 4px;
  }

  80% {
    gap: 3px;
  }

  100% {
    gap: 0;
  }
`;

export const bump = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.95);
  }
  30% {
    transform: scale(1.04);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
`;

export const flipInX = keyframes`
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
    opacity: 0.8;
  }

  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
`;
