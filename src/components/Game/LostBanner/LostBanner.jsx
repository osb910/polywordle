import Banner from '../Banner';

const LostBanner = ({wordle, resetGame}) => (
  <Banner status='sad'>
    <p>
      Sorry, the correct wordle is <strong>{wordle}</strong>.
    </p>
    <button onClick={resetGame}>Play again</button>
  </Banner>
);

export default LostBanner;
