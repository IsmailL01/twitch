'use client';

import { Button } from '@/components/ui/Button';
import { onFollow, onUnFollow } from '@/actions/follow';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { onBlock, onUnBlock } from '@/actions/block';

interface ActionProps {
  isFollowing: boolean;
  isBlockedByThisUser: boolean;
  userId: string;
}

const Actions = (props: ActionProps) => {
  const { isFollowing, userId, isBlockedByThisUser } = props;

  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) =>
          toast.success(`You have unFollowed ${data.following.username}`)
        )
        .catch((error) => toast.error(`${error}`));
    });
  };

  const onHandleFollowing = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`Blocked the user ${data.blocked.username}`)
        )
        .catch(() => toast.error('Something went error'));
    });
  };

  const handleUnBlocking = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((data) =>
          toast.success(`unblocked the user ${data.blocked.username}`)
        )
        .catch(() => toast.error('Something went error'));
    });
  };

  const onHandleBlocking = () => {
    if (isBlockedByThisUser) {
      handleUnBlocking();
    } else {
      handleBlock();
    }
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={onHandleFollowing}
        variant='primary'
      >
        {isFollowing ? 'unFollow' : 'Follow'}
      </Button>
      <Button disabled={isPending} onClick={onHandleBlocking}>
        {isBlockedByThisUser ? 'unBlock' : 'Block'}
      </Button>
    </>
  );
};

export default Actions;
