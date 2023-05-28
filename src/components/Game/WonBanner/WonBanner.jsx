// import styled from 'styled-components';
import Banner from '../Banner';

const WonBanner = ({className, step, resetGame}) => (
  <Banner status='happy'>
    <p>
      <strong>Congratulations!</strong> Got it in{' '}
      <strong>
        {step} guess{step > 1 && 'es'}
      </strong>
      .
    </p>
    <button onClick={resetGame}>Play again</button>
  </Banner>
);

export default WonBanner;
