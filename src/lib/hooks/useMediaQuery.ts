import { useCallback, useMemo, useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const memoizedWidth = useMemo(() => {
    return width;
  }, [width]);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) setTargetReached(true);
    else setTargetReached(false);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(`(max-width: ${memoizedWidth}px)`);
    media.addEventListener('change', updateTarget);

    if (media.matches) setTargetReached(true);

    return () => media.removeEventListener('change', updateTarget);
  }, [updateTarget, memoizedWidth]);

  return targetReached;
};
