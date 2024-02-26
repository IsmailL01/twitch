'use client';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { ReactNode, memo, useCallback, useMemo } from 'react';
import { useEffect } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = memo((props: ContainerProps) => {
  const { children } = props;
  const { collapsed, onCollapse, onExpand } = useSidebar();

  const matches = useMediaQuery(1024);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn('flex-1', collapsed ? 'ml-[70px]' : 'ml-[70px]  lg:ml-60')}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container_SIDEBAR';

export { Container };
