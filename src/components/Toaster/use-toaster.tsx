'use client';

import {createContext, useMemo, ReactNode, useEffect, useContext} from 'react';
import {useImmer} from 'use-immer';
import useHotKeys, {HotKey} from '../../hooks/use-hotkeys';

export type Toast = {
  id: string;
  variant: 'success' | 'error' | 'warning' | 'notice';
  message: JSX.Element | string;
  delay?: number;
};

interface ToastContextProps {
  toasts: Toast[];
  createToast: (variant: Toast['variant'], message: Toast['message']) => void;
  dismissToast: (idx: number) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  createToast: () => {},
  dismissToast: () => {},
  clearToasts: () => {},
});

export const ToastProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [toasts, setToasts] = useImmer<Toast[]>([]);

  useEffect(() => {
    const resetBtn = document.querySelector(
      '.toaster button:not(.closeButton)'
    ) as HTMLButtonElement;
    resetBtn?.focus();
  }, [toasts]);

  const createToast = (
    variant: Toast['variant'],
    message: Toast['message'],
    delay?: number
  ) => {
    setToasts(draft => {
      draft.unshift({id: crypto.randomUUID(), variant, message, delay});
    });
    const resetBtn = document.querySelector('.resetBtn') as HTMLButtonElement;
    resetBtn?.focus();
  };

  const dismissToast = (idx: number) => {
    setToasts(draft => {
      draft.splice(idx, 1);
    });
  };

  const clearToasts = () => setToasts([]);

  const keyboardShortcuts = useMemo((): HotKey[] => {
    return [
      {
        hotKey: 'Escape',
        run: () => clearToasts(),
      },
    ];
  }, []);
  useHotKeys(keyboardShortcuts);

  return (
    <ToastContext.Provider
      value={{toasts, createToast, dismissToast, clearToasts}}
    >
      {children}
    </ToastContext.Provider>
  );
};

const useToaster = () => {
  const data = useContext(ToastContext);

  if (!data)
    throw new Error('Cannot consume Toast context without a ToastProvider');

  return data;
};

export default useToaster;
