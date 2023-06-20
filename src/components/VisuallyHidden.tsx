import {ReactNode} from 'react';

const hiddenStyles: {[key: string]: string | number} = {
  display: 'inline-block',
  position: 'absolute',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  blockSize: 1,
  inlineSize: 1,
  margin: -1,
  padding: 0,
  border: 0,
};

const VisuallyHidden = ({children}: {children: ReactNode}) => (
  <span style={hiddenStyles}>{children}</span>
);

export default VisuallyHidden;
