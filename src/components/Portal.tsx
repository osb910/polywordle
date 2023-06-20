import {useState, useEffect, useId, ReactNode} from 'react';
import {createPortal} from 'react-dom';

const Portal = ({children}: {children: ReactNode}) => {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const id = useId();

  useEffect(() => {
    const root = document.querySelector('#root') as HTMLDivElement;
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute(`data-portal${id}`, '');
    root.insertAdjacentElement('afterend', portalRoot);
    setHost(portalRoot);

    return () => portalRoot.remove();
  }, [id]);

  return host ? createPortal(children, host) : null;
};

// Simple version
// const Portal2 = ({children}) =>
//   createPortal(<div data-portal>{children}</div>, document.body);

export default Portal;
