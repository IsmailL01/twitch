'use client';

import { cn } from '@/lib/utils';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ChatInfo } from './ChatInfo';

interface ChatFormProps {
  onSubmit: () => void;
  onChange: (value: string) => void;

  value: string;

  isHidden: boolean;
  isChatFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
}

export const ChatForm = (props: ChatFormProps) => {
  const {
    onSubmit,
    onChange,
    value,
    isHidden,
    isChatFollowersOnly,
    isDelayed,
    isFollowing,
  } = props;

  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing;

  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);

      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <form
      className='flex flex-col items-center gap-y-4 p-3'
      onSubmit={handleSubmit}
    >
      <ChatInfo
        isDelayed={isDelayed}
        isChatFollowersOnly={isChatFollowersOnly}
      />
      <div className='w-full'>
        <Input
          className={cn(
            'border-white/10',
            isChatFollowersOnly || (isDelayed && 'rounded-t-none border-t-0')
          )}
          onChange={handleOnChange}
          value={value}
          disabled={false}
          placeholder='Send a message'
        />
      </div>
      <div className='ml-auto'>
        <Button type='submit' variant='primary' size='sm' disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-y-4 p-3'>
      <Skeleton className='w-full h-10' />
      <div className='flex items-center gap-x-2 ml-auto'>
        <Skeleton className='h-7 w-7' />
        <Skeleton className='h-7 w-12' />
      </div>
    </div>
  );
};
