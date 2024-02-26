'use client';

import { MinusCircle } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Hint } from '@/src/components/Hint';
import { onBlock } from '@/src/actions/block';
import { cn, stringToColor } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/Button';

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = (props: CommunityItemProps) => {
  const { hostName, viewerName, participantName, participantIdentity } = props;

  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || '');
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const onHandleBlock = () => {
    if (!participantName || isSelf || !isHost) return;
    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <div
      className={cn(
        'group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5',
        isPending && 'opacity-50 pointer-events-none'
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label='Block'>
          <Button
            variant='ghost'
            disabled={isPending}
            onClick={onHandleBlock}
            className='h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition'
          >
            <MinusCircle className='h-4 w-4 text-muted-foreground' />
          </Button>
        </Hint>
      )}
    </div>
  );
};
