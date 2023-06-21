import {useState, useEffect} from 'react';

export interface Options {
  times?: number;
  delay?: number;
}

const useTemporary = (cb: Function, {times, delay}: Options) => {
  const [visitNum, setVisitNum] = useState<number>(
    +localStorage.getItem('visitNum')!
  );

  useEffect(() => {
    const timeout = setTimeout(
      () => visitNum <= (times ?? 1) - 1 && cb(),
      delay ?? 0
    );

    const incrementVisitNum = () => {
      setVisitNum(current => current + 1);
      localStorage.setItem('visitNum', JSON.stringify(visitNum + 1));
    };
    window.addEventListener('beforeunload', incrementVisitNum);

    if (
      window.performance
        .getEntriesByType('navigation')
        .some((nav: {[x: string]: any}) => nav.type === 'reload')
    ) {
      console.log('reloaded');
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('beforeunload', incrementVisitNum);
    };
  }, []);
};

export default useTemporary;
