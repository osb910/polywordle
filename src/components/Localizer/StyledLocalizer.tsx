import styled from 'styled-components';
import Localizer from './Localizer';

export const StyledLocalizer = styled(Localizer)`
  --sec-color: #a8dadc;
  --ter-color: #457b9d;
  --hex-color: #1d3557;
  --sept-color: #d1dadd75;
  --border-radius: 6px;

  .rtl & .current-lang {
    font-family: Lotus;
    font-weight: 700;
    font-size: 1.125rem;
  }

  & .current-lang {
    font-weight: 700;
    padding: 0;
    margin: 0;
  }

  & ul {
    position: absolute;
    inset-block-start: 2rem;
    padding: 0;
    border: 2px solid var(--sec-color);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    cursor: pointer;
    box-shadow: 1px 2px 20px rgba(0, 0, 0, 0.2);
    visibility: hidden;
    opacity: 0;
    overflow: hidden;
    transition: opacity 300ms ease-in-out;
  }

  &:hover ul {
    visibility: visible;
    opacity: 1;
  }

  & ul li {
    inline-size: 100%;
    text-align: center;
    padding-block: 0.5em;
    padding-inline: 0.5em;
    background-color: #ffffff75;
  }

  & ul li.selected {
    background-color: rgba(200, 200, 200, 0.75);
    pointer-events: none;
  }

  & ul li:hover {
    background-color: var(--sept-color);
  }

  .dark & ul li {
    background-color: var(--hex-color);
  }

  .dark & ul li:hover {
    background-color: var(--ter-color);
  }
`;

export default StyledLocalizer;
