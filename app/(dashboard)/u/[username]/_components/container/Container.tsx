'use client';

import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { useEffect, type ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface ContainerProps {
  children: ReactNode;
}

export const Container = (props: ContainerProps) => {
  const { children } = props;
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar();
  const matches = useMediaQuery(`(max-width: 1024px)`);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn('flex-1 ml-[70px]', collapsed ? '' : 'lg:ml-60')}>
      {children}
    </div>
  );
};
