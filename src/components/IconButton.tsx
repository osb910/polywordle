import {ReactNode, MouseEventHandler} from 'react';
import styled from 'styled-components';
import {bump} from './animations/keyframes';

export type IconButtonProps = {
  icon: JSX.Element;
  children?: ReactNode;
  className?: string;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  highlightDeps?: any[];
  [x: string]: any;
};

const IconButton = ({
  icon,
  children,
  className,
  clickHandler,
  highlightDeps,
  ...delegated
}: IconButtonProps) => (
  <Wrapper
    className={`${className ?? ''} bump`}
    onClick={clickHandler}
    key={highlightDeps?.join('')}
    {...delegated}
  >
    {icon}
    {children}
  </Wrapper>
);

const Wrapper = styled.button`
  --sec-color: #a8dadc;
  --ter-color: #457b9d;
  --hex-color: #1d3557;
  --sept-color: #e1eaee;

  block-size: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25em;
  margin-block: 0;
  border-radius: 50%;
  background-color: var(--sept-color);
  cursor: pointer;
  font-family: 'Calibri';
  color: var(--hex-color);
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
  transition: all 200ms ease-in-out;
  border: 3px solid hsl(0deg 0% 85%);
  border-block-start-color: hsl(0deg 0% 100%);
  border-block-end-color: hsl(0deg 0% 70%);
  background: hsl(0deg 0% 93%);

  &:active {
    border-block-start-color: hsl(0deg 0% 60%);
    border-inline-start-color: hsl(0deg 0% 75%);
    border-inline-end-color: hsl(0deg 0% 75%);
    border-block-end-color: hsl(0deg 0% 92%);
    background: hsl(0deg 0% 85%);
  }

  &:where(:hover, :focus) {
    transform: scale(1.1);
  }

  &.rtl svg {
    transform: scaleX(-1);
  }

  & svg {
    width: 22px;
    margin: 0;
    stroke: var(--hex-color);
    color: var(--hex-color);
    border-radius: 50%;
  }

  .dark & {
    color: var(--sept-color);
  }

  &.bump {
    animation: ${bump} 400ms ease-in-out;
  }
`;

export default IconButton;
