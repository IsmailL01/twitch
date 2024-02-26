'use client';

import { Button } from '@/src/components/ui/Button';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { cn } from '@/src/lib/utils';
import { useCreatorSidebar } from '@/src/store/use-creator-sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface NavItemProps {
  label: string;
  href: string;
  isActive: boolean;
  Icon: LucideIcon;
}

const NavItem = (props: NavItemProps) => {
  const { label, href, isActive, Icon } = props;
  const { collapsed } = useCreatorSidebar();

  return (
    <Button
      className={cn(
        'w-full h-12',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
      )}
      asChild
      variant='ghost'
    >
      <Link href={href}>
        <div className='flex items-center gap-x-4'>
          <Icon className={cn('h-4 w-4', collapsed ? 'mr-0' : 'mr-2')} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className='flex items-center gap-x-4 px-3 py-2'>
      <Skeleton className='min-h-[48px] min-w-[48px] rounded-md' />
      <div className='flex-1 hidden lg:block'>
        <Skeleton className='h-6' />
      </div>
    </li>
  );
};

export default NavItem;
