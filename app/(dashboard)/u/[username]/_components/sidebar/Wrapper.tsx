'use client';

import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = (props: WrapperProps) => {
  const { children } = props;
  const { collapsed } = useCreatorSidebar();

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E34] z-50',
        collapsed && 'lg:w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
