'use client';

import { Info } from 'lucide-react';
import { useMemo } from 'react';
import { Hint } from '@/src/components/Hint';

interface ChatInfoProps {
  isDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const ChatInfo = (props: ChatInfoProps) => {
  const { isDelayed, isChatFollowersOnly } = props;

  const hint = useMemo(() => {
    if (isChatFollowersOnly && !isDelayed) {
      return 'Only followers can chat';
    }

    if (isDelayed && !isChatFollowersOnly) {
      return 'Messages are delayed by 3 seconds';
    }

    if (isDelayed && isChatFollowersOnly) {
      return 'Only followers can chat. Messages are delayed by 3 seconds';
    }

    return '';
  }, [isDelayed, isChatFollowersOnly]);

  const label = useMemo(() => {
    if (isChatFollowersOnly && !isDelayed) {
      return 'Followers only';
    }

    if (isDelayed && !isChatFollowersOnly) {
      return 'Slow mode';
    }

    if (isDelayed && isChatFollowersOnly) {
      return 'Followers only and slow mode';
    }

    return '';
  }, [isDelayed, isChatFollowersOnly]);

  if (!isDelayed && !isChatFollowersOnly) {
    return null;
  }

  return (
    <div className='p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2'>
      <Hint label={hint}>
        <Info className='h-4 w-4' />
      </Hint>
      <p className='text-xs font-semibold'>{label}</p>
    </div>
  );
};
