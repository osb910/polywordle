import {useContext} from 'react';
import styled from 'styled-components';
import Guess from './Guess';
import GameContext from '../../../context/game-context';

interface GridProps {
  className?: string;
  key?: any;
}

const Grid = ({className}: GridProps) => {
  const {guesses} = useContext(GameContext);
  console.log(guesses);
  return (
    <ol className={className}>
      {guesses.map(({word, id}, idx) => (
        <Guess word={word} key={id} step={idx + 1} />
      ))}
    </ol>
  );
};

const StyledGrid = styled(Grid)`
  position: relative;
  padding: 0;
  margin: 0;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

export default StyledGrid;
