import styled, {keyframes} from 'styled-components';

export const appear = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.7);
  }

  90% {
    opacity: 1;
    transform: scale(1.05);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const disappear = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }

  80% {
    opacity: 0.9;
    transform: scale(0.8);
  }

  100% {
    opacity: 0;
    transform: scale(0.5);
  }
`;

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
    inset-block-start: 0.5rem;
    max-block-size: 90vh;
    position: relative;
    padding-block: 1.25em;
    padding-inline: 1.25em;
    border-radius: 0.5rem;
    background: white;
    font-family: 'Atkinson', sans-serif;
    overflow-y: auto;
    overflow-x: hidden;
    animation: ${appear} 600ms ease-out both;
  }

  & .modal.rtl {
    font-family: 'Calibri', sans-serif;
  }

  & .exiting {
    animation: ${disappear} 600ms ease-in both;
  }

  & .dismissBtn {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    padding: 0.25em;
    color: inherit;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: transform 300ms ease-in-out;
  }

  & .dismissBtn:hover {
    transform: scale(1.2) rotate(-90deg);
  }
`;

export default Wrapper;
