import {useState, useCallback} from 'react';

type Toggle = (initialValue?: any) => [value: boolean, toggleValue: Function];

const useToggle = (initialValue: Toggle) => {
  const [value, setValue] = useState<boolean>(!!initialValue);

  const toggleValue = useCallback(() => {
    setValue(currentValue => !currentValue);
  }, []);

  return [value, toggleValue];
};

export default useToggle;
