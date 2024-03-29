import { StreamPlayerSkeleton } from '@/components/streamPlayer/StreamPlayer';
import React from 'react';

const UserLoading = () => {
  return (
    <div className='h-full'>
      <StreamPlayerSkeleton />
    </div>
  );
};

export default UserLoading;
