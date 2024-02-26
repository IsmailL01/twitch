import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/lib/utils';

import { Skeleton } from '@/src/components/ui/Skeleton';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/Avatar';
import { LiveBadge } from '@/src/components/LiveBadge';

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'h-8 w-8',
      lg: 'h-14 w-14',
      xl: 'h-20 w-20',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
}

const UserAvatar = (props: UserAvatarProps) => {
  const { imageUrl, username, isLive, showBadge, size } = props;
  const canShowBadge = showBadge && isLive;

  return (
    <div className='relative'>
      <Avatar
        className={cn(
          isLive && 'ring-2 ring-rose-500 border border-background',
          avatarSizes({ size })
        )}
      >
        <AvatarImage className='object-cover' src={imageUrl} />

        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2'>
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = (props: UserAvatarSkeletonProps) => {
  const { size } = props;
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />;
};

export { UserAvatar };
