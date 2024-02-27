'use client';

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { Hint, HintSides } from '@/components/Hint';
import { Button } from '@/components/ui/Button';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { userAgent } from 'next/server';

interface ToggleProps {}

export const Toggle = (props: ToggleProps) => {
  const { onExpand, onCollapse, collapsed } = useCreatorSidebar();

  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
      {collapsed && (
        <div className='w-full hidden lg:flex items-center justify-center pt-4 mb-4'>
          <Hint side={HintSides.RIGHT} asChild label={label}>
            <Button
              className='h-auto p-2 ml-auto'
              onClick={onExpand}
              variant='ghost'
            >
              <ArrowRightFromLine className='h-4 w-4' />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className='p-3 pl-6 mb-2 hidden lg:flex items-center w-full'>
          <p className='font-semibold text-primary'>Dashboard</p>
          <Hint label={label} side={HintSides.RIGHT} asChild>
            <Button
              className='h-auto p-2 ml-auto'
              onClick={onCollapse}
              variant='ghost'
            >
              <ArrowLeftFromLine className='h-4 w-4' />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};
