import { LiveBadge } from '@/components/LiveBadge';
import { Thumbnail, ThumbnailSkeleton } from '@/components/Thumbnail';
import { UserAvatar, UserAvatarSkeleton } from '@/components/UserAvatar';
import { Skeleton } from '@/components/ui/Skeleton';
import { Stream, User } from '@prisma/client';
import Link from 'next/link';

interface ResultCardProps {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  const {
    user: { username, imageUrl },
    thumbnailUrl,
    isLive,
    name,
  } = data;

  return (
    <Link href={`/${username}`}>
      <div className='h-full w-full space-y-4'>
        <Thumbnail
          src={thumbnailUrl}
          fallback={imageUrl}
          isLive={isLive}
          username={username}
        />

        <div className='flex gap-x-3'>
          <UserAvatar username={username} imageUrl={imageUrl} isLive={isLive} />
          <div className='flex flex-col text-sm overflow-hidden'>
            <p className='truncate font-semibold hover:text-blue-500'>{name}</p>
            <p className='text-muted-foreground'>{username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className='h-full w-full space-y-4'>
      <ThumbnailSkeleton />
      <div className='flex gap-x-3'>
        <UserAvatarSkeleton />
        <div className='flex flex-col gap-y-1'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-24' />
        </div>
      </div>
    </div>
  );
};
