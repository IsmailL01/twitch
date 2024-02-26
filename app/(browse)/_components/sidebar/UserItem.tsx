'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useSidebar } from '@/store/use-sidebar';
import { Skeleton } from '@/components/ui/Skeleton';
import { UserAvatar } from '@/components/UserAvatar';
import Link from 'next/link';
import { LiveBadge } from '@/components/LiveBadge';

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

const UserItem = (props: UserItemProps) => {
  const { username, imageUrl, isLive } = props;
  const pathname = usePathname();

  const { collapsed } = useSidebar();
  const href = `/${username}`;
  const isActive = pathname === href;
  return (
    <Button
      asChild
      variant='ghost'
      className={cn(
        'w-full h-12',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            'flex items-center w-full gap-x-4',
            collapsed && 'justify-center'
          )}
        >
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          {!collapsed && <p className='truncate'>{username}</p>}
          {!collapsed && isLive && <LiveBadge className='ml-auto' />}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className='flex items-center gap-x-4 px-3 py-2'>
      <Skeleton className='min-h-[32] min-w-[32px] rounded-full' />
      <div className='flex-1'>
        <Skeleton className='h-6' />
      </div>
    </li>
  );
};

export default UserItem;
