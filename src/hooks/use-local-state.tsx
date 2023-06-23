'use client';

import {useState, useEffect, Dispatch, SetStateAction} from 'react';

const useLocalState = (
  cb: (value: any) => any,
  key: string,
  initial?: any
): [any, Dispatch<SetStateAction<any>>] => {
  const [state, setState] = useState<any>(initial ?? null);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) return;

    const value = cb(storedValue);
    setState(value);
  }, []);

  useEffect(() => {
    console.log({state});
    window.localStorage.setItem(
      key,
      typeof state === 'string' || state === null
        ? state
        : JSON.stringify(state)
    );
  }, [state]);

  return [state, setState];
};

export default useLocalState;
