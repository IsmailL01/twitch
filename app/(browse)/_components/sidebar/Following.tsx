'use client';
import { useSidebar } from '@/store/use-sidebar';
import { Follow, User } from '@prisma/client';
import React from 'react';
import UserItem, { UserItemSkeleton } from './UserItem';

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
}

const Following = (props: FollowingProps) => {
  const { data } = props;

  const { collapsed } = useSidebar();

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className='pl-6 mb-4'>
          <p className='text-sm text-muted-foreground'>Following</p>
        </div>
      )}
      <ul className='space-y-2 px-2'>
        {data.map((follow) => {
          const { following } = follow;
          return (
            <UserItem
              key={following.id}
              username={following.username}
              imageUrl={following.imageUrl}
              isLive={following.stream?.isLive}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className='px-2 pt-2 lg:pt-0'>
      {[...Array(3).map((_, index) => <UserItemSkeleton key={index} />)]}
    </ul>
  );
};

export default Following;
