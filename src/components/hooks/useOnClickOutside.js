'use client';

import { useEffect, useRef } from 'react';

export default function useOnClickOutside(handler) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const listener = (e) => {
      if (!element || element.contains(e.target)) {
        return;
      }
      handler(e);
    };

    window.addEventListener('mousedown', listener);
    window.addEventListener('touchstart', listener);
    return function () {
      window.removeEventListener('mousedown', listener);
      window.removeEventListener('touchstart', listener);
    };
  }, [handler, ref]);
  return ref;
}
