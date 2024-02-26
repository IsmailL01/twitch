'use client';

import { onFollow, onUnFollow } from '@/src/actions/follow';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/src/components/ui/Skeleton';

interface ActionsProps {
  isFollowing: boolean;
  isHost: boolean;
  hostIdentity: string;
}

export const Actions = (props: ActionsProps) => {
  const { isFollowing, isHost, hostIdentity } = props;
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unFollowed ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push('/sign-in');
    }
    if (isHost) return;

    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      className='w-full lg:w-auto'
      onClick={toggleFollow}
      disabled={isPending || isHost}
      variant='primary'
      size='sm'
    >
      <Heart
        className={cn('h-4 w-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')}
      />
      {isFollowing ? 'UnFollow' : ' Follow'}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className='h-10 w-full lg:w-24' />;
};
