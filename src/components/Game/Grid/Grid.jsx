import styled from 'styled-components';
import Guess from './Guess';

const Grid = ({words, className}) => (
  <ol className={className}>
    {words.map(({word, step, id}) => (
      <Guess word={word} key={id} step={step} />
    ))}
  </ol>
);

const StyledGrid = styled(Grid)`
  position: relative;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

export default StyledGrid;
