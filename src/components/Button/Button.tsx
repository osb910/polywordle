import {ReactNode} from 'react';
import styled from 'styled-components';

import {COLORS} from './constants';

const SIZES = {
  small: {
    '--borderRadius': '2px',
    '--fontSize': '1rem',
    '--padding-block': '0.325em',
    '--padding-inline': '0.75em',
  },
  medium: {
    '--borderRadius': '4px',
    '--fontSize': '1.125rem',
    '--padding-block': '0.6em',
    '--padding-inline': '1em',
  },
  large: {
    '--borderRadius': '6px',
    '--fontSize': '1.25rem',
    '--padding-block': '0.75em',
    '--padding-inline': '1.25em',
  },
};

export interface ButtonProps {
  variant: 'fill' | 'outline' | 'ghost';
  size: 'small' | 'medium' | 'large';
  href?: string;
  as?: string;
  children: ReactNode;
  className?: string;
  [x: string]: any;
}

const Button = ({
  variant,
  size,
  href,
  as,
  children,
  className,
  ...delegated
}: ButtonProps) => {
  const styles = SIZES[size];
  // FIX: Review type for this
  const Component: any =
    variant === 'fill'
      ? FillButton
      : variant === 'outline'
      ? OutlineButton
      : GhostButton;
  return (
    <Component
      as={(href && as) || 'button'}
      style={styles}
      size={size}
      variant={variant}
      className={className}
      {...delegated}
    >
      {children}
    </Component>
  );
};

const ButtonBase = styled.button`
  font-family: inherit;
  border-radius: var(--borderRadius);
  font-size: var(--fontSize);
  padding-block: var(--padding-block);
  padding-inline: var(--padding-inline);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    border: 2px solid ${COLORS.primary};
  }

  &:focus {
    outline-color: ${COLORS.primary};
    outline-offset: 4px;
  }
`;

const FillButton = styled(ButtonBase)`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};

  &:hover {
    background-color: ${COLORS.primaryLight};
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: ${COLORS.white};
  color: ${COLORS.primary};
  border: 2px solid currentColor;

  &:hover {
    background-color: ${COLORS.offwhite};
  }
`;

const GhostButton = styled(ButtonBase)`
  background-color: ${COLORS.offwhite};
  color: ${COLORS.gray};

  &:hover {
    background-color: ${COLORS.transparentGray15};
    color: ${COLORS.black};
    border: 2px solid transparent;
  }

  &:focus {
    outline-color: currentColor;
  }
`;

export default Button;
