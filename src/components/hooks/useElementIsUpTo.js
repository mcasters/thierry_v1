import { useState, useEffect, useCallback, useRef, LegacyRef } from 'react';

function useElementIsUpTo(yLimit) {
  const [isUpTo, setIsUpTo] = useState(false);
  const ref = useRef();

  const handleScroll = useCallback(() => {
    const currentIsUpTo = ref.current?.getBoundingClientRect().bottom <= yLimit;

    if (currentIsUpTo !== isUpTo) {
      setIsUpTo(currentIsUpTo);
    }
  }, [isUpTo, ref, yLimit]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  return [isUpTo, ref];
}

export default useElementIsUpTo;
