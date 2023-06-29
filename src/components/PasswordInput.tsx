'use client';

import styled from 'styled-components';
import Input from './Input';
import {Eye, EyeOff} from 'react-feather';
interface PasswordInputProps {}

const PasswordInput = ({}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Input label='Password' type='password' id='password'>
      <Wrapper className='eye'>{showPassword ? <EyeOff /> : <Eye />}</Wrapper>
    </Input>
  );
};

const Wrapper = styled.span`
  & .eye {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 0.25em;
    cursor: pointer;
  }
`;

export default PasswordInput;
