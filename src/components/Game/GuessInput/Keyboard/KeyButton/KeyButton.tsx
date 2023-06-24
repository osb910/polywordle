import {memo, FC, MouseEvent, KeyboardEvent} from 'react';
import useLocalizer from '../../../../Localizer/use-localizer';

export type ClickEvent = {
  [key: string]: string | MouseEvent | KeyboardEvent | boolean | any;
};
interface KeyButtonProps {
  btn: string;
  status?: string;
  active: boolean;
  keyName: string;
  handleClick: (evt: ClickEvent) => void;
}
const KeyButton: FC<KeyButtonProps> = memo(
  ({btn, status, active, keyName, handleClick}) => {
    const {lang} = useLocalizer();
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
        onClick={(evt: MouseEvent) => handleClick({...evt, key: keyName})}
      >
        <kbd>{btn.toUpperCase()}</kbd>
      </button>
    );
  }
);

export default KeyButton;
