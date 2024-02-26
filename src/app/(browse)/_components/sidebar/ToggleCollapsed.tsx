'use client';
import { Hint, HintSides } from '@/src/components/Hint';
import { Button } from '@/src/components/ui/Button';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { useSidebar } from '@/src/store/use-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

const ToggleCollapsed = () => {
  const { onCollapse, onExpand, collapsed } = useSidebar();

  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
      {collapsed ? (
        <div className='hidden lg:flex w-full items-center justify-center pt-4 mb-4'>
          <Hint label={label} side={HintSides.RIGHT} asChild>
            <Button onClick={onExpand} className='h-auto p-2' variant='ghost'>
              <ArrowRightFromLine className='h-4 w-4' />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className='p-3 pl-6 mb-2 flex items-center w-full'>
          <p className='font-semibold text-primary'>for you</p>
          <Hint label={label} side={HintSides.RIGHT} asChild>
            <Button
              onClick={onCollapse}
              className='h-auto p-2 ml-auto'
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

export const ToggleSkeleton = () => {
  return (
    <div className='p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full'>
      <Skeleton className='h-6 w-[100px]' />
      <Skeleton className='h-6 w-6' />
    </div>
  );
};

export { ToggleCollapsed };
