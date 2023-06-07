import styled from 'styled-components';
import AppContext from '../../../../../lib/app-context';
import {memo, useContext} from 'react';
const KeyButton = memo(({btn, status, active, keyName, handleClick}) => {
  const {lang} = useContext(AppContext);
  return (
    <button
      className={`${status ?? ''} ${active ? 'active' : ''}`}
      style={
        /[⮐⮑⌫⌦]/.test(btn)
          ? {
              width:
                lang === 'ar' ? '4.5rem' : btn === '⮐' ? '6.5rem' : 'initial',
              fontSize: '1.5rem',
              fontFamily: 'monospace',
              backgroundColor: /[⮐⮑]/.test(btn) ? 'rgb(0, 123, 255)' : '#f55',
            }
          : {}
      }
      data-letter={keyName}
      type='button'
      onClick={evt =>
        handleClick({
          ...evt,
          key: keyName,
        })
      }
    >
      <kbd>{btn.toUpperCase()}</kbd>
    </button>
  );
});

export default KeyButton;
