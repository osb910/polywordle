import {useId, ChangeEvent, ReactNode} from 'react';
import styled from 'styled-components';

export interface InputProps {
  id?: string;
  label: string;
  className?: string;
  type?: string;
  setInput?: Function;
  children?: ReactNode;
  [x: string]: any;
}

const Input = ({
  id,
  label,
  className,
  type = 'text',
  setInput,
  children,
  ...delegated
}: InputProps) => {
  const generatedId = useId();
  const appliedId = id || generatedId;

  return (
    <Wrapper className={className}>
      <label htmlFor={appliedId}>{label}</label>
      <input
        name={id}
        onChange={(evt: ChangeEvent): void =>
          setInput?.(+(evt.target as HTMLInputElement).value)
        }
        {...delegated}
        type={type}
        id={appliedId}
      />
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.p.attrs({dir: 'auto'})`
  & input {
    padding: 0.25em;
    border: 0;
    border-radius: 6px;
  }
`;

export default Input;
