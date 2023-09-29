/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import { useCallback, useEffect, useRef } from 'react';

const useInterval = (callback, interval) => {
  const callbackRef = useRef(callback);
  const intervalRev = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    intervalRev.current = setInterval(() => callbackRef.current(), interval);
  }, [interval]);

  const clear = useCallback(() => {
    intervalRev.current && clearInterval(intervalRev.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [interval, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
};

export default useInterval;
