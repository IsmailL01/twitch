'use client';

import { cn } from '@/src/lib/utils';
import { useIsClient } from 'usehooks-ts';
import { useSidebar } from '@/src/store/use-sidebar';
import { ReactNode, memo } from 'react';
import { ToggleSkeleton } from './ToggleCollapsed';
import { RecommendedSkeleton } from './Recommended';
import { FollowingSkeleton } from './Following';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = memo((props: WrapperProps) => {
  const { children } = props;
  const isClient = useIsClient();
  const { collapsed } = useSidebar();

  if (!isClient)
    return (
      <aside className='fixed left-0 flex flex-col w-[70] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50 duration-collapsed ease-collapsed'>
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 duration-collapsed ease-collapsed',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  );
});

Wrapper.displayName = 'SIDEBAR_WRAPPER';

export { Wrapper };
