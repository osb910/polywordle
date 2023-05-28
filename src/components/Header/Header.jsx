import styled from 'styled-components';

const Header = ({className}) => (
  <header className={className}>
    <h1>Word Game</h1>
  </header>
);

const StyledHeader = styled(Header)`
  margin-block-end: 0.5em;
  display: flex;
  border-bottom: 1px solid var(--color-gray-700);
  color: var(--color-gray-300);

  & .side {
    width: var(--header-height);
    display: grid;
    place-content: center;
  }

  & h1 {
    flex: 1;
    font-size: 2rem;
    /* line-height: var(--header-height); */
    text-align: center;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 25rem) {
    font-size: 1.25rem;
  }
`;

export default StyledHeader;
