import {ReactNode, MouseEventHandler, useState, useEffect} from 'react';
import styled from 'styled-components';
import {bump} from './animations/keyframes';

export type IconButtonProps = {
  icon: JSX.Element;
  children?: ReactNode;
  className?: string;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  highlightDeps?: any[];
};

const IconButton = ({
  icon,
  children,
  className,
  clickHandler,
  highlightDeps,
}: IconButtonProps) => {
  const [highlighted, setHighlighted] = useState<boolean>(false);

  useEffect(() => {
    setHighlighted(true);
    let timer = setTimeout(() => setHighlighted(false), 700);
    return () => clearTimeout(timer);
  }, highlightDeps ?? []);

  return (
    <Wrapper
      className={`${className} ${highlighted ? 'bump' : ''}`}
      onClick={clickHandler}
    >
      {icon}
      {children}
    </Wrapper>
  );
};

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
  padding: 0.4em;
  margin-block: 0;
  margin-inline: 0.8em;
  border-radius: 1rem;
  background-color: var(--sept-color);
  cursor: pointer;
  font-family: 'Calibri';
  color: var(--hex-color);
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
  transition: all 200ms ease-in-out;

  &:where(:hover, :focus) {
    transform: scale(1.1);
  }

  & img {
    width: 1.5rem;
    margin: 0;
    stroke: var(--hex-color);
    color: var(--hex-color);
    border-radius: 50%;
  }

  .dark & {
    color: var(--sept-color);
  }

  &.bump {
    animation: ${bump} 500ms ease-in-out;
  }
`;

export default IconButton;
