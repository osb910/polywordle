import {useState, useEffect, useId, ReactNode} from 'react';
import {createPortal} from 'react-dom';

const Portal = ({lang, children}: {lang?: string; children: ReactNode}) => {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const id = useId();

  useEffect(() => {
    const root = document.querySelector('#root') as HTMLDivElement;
    const dir = lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr';
    const portal = new DOMParser().parseFromString(
      `
      <div data-portal${id} dir=${dir} class='${dir}'></div>
    `,
      'text/html'
    ).body.firstChild as HTMLElement;
    root.insertAdjacentElement('afterend', portal);
    setHost(portal);

    return () => portal.remove();
  }, [id, lang]);

  return host ? createPortal(children, host) : null;
};

// Simple version
// const Portal2 = ({children}) =>
//   createPortal(<div data-portal>{children}</div>, document.body);

export default Portal;
