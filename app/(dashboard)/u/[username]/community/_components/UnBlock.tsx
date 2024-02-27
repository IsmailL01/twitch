'use client';

import { onUnBlock } from '@/actions/block';
import { Button } from '@/components/ui/Button';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface UnBlockButtonProps {
  userId: string;
}

export const UnBlockButton = (props: UnBlockButtonProps) => {
  const { userId } = props;
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((result) =>
          toast.success(`User ${result.blocked.username} unBlocked`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <Button
      className='text-blue-500 w-full'
      variant='link'
      size='sm'
      disabled={isPending}
      onClick={onClick}
    >
      UnBlock
    </Button>
  );
};
