import styled from 'styled-components';
const Banner = ({className, status, children}) => {
  return <aside className={`${status} ${className}`}>{children}</aside>;
};

const StyledBanner = styled(Banner)`
  position: fixed;
  z-index: 1;
  inset-inline: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  text-align: center;
  animation: slideUp 1.25s cubic-bezier(0, 0.72, 0.24, 1.02);
  /* animation-delay: 800ms; */
  border-radius: 4px 4px 0px 0px;
  will-change: transform;

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

  & button {
    padding: 0.4em 0.8em;
    margin-block: 0.5em 0;
    background-color: transparent;
    /* color: var(--color-gray-100); */
    border: 1px solid;
    border-radius: 4px;
    font-size: 1.25rem;
    transition: all 300ms ease-in-out;
  }

  & button:where(:hover, :focus-visible) {
    background-color: var(--color-gray-100);
  }
`;

export default StyledBanner;
