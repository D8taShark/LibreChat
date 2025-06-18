import { useEffect, useRef } from 'react';
import { logger } from '~/utils';

type TUseTimeoutParams = {
  callback: (error: string | number | boolean | null) => void;
  delay?: number;
};
type TTimeout = ReturnType<typeof setTimeout> | null;

function useTimeout({ callback, delay = 400 }: TUseTimeoutParams) {
  const timeout = useRef<TTimeout>(null);

  const callOnTimeout = (value?: string) => {
    // Clear existing timeout
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }

    // Set new timeout
    if (value != null && value) {
      logger.log('timeout', value);
      timeout.current = setTimeout(() => {
        callback(value);
      }, delay);
    }
  };

  // Clear timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return callOnTimeout;
}

export default useTimeout;
