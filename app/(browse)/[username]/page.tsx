import { notFound } from 'next/navigation';
import { getUserByUsername } from '@/lib/services/user-service';
import React from 'react';
import { isFollowingUser } from '@/lib/services/follow-service';
import Actions from './_components/Actions';
import { isBlockedByUser } from '@/lib/services/block-service';
import { StreamPlayer } from '@/components/streamPlayer/StreamPlayer';

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async (props: UserPageProps) => {
  const {
    params: { username },
  } = props;
  const user = await getUserByUsername(username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlockedByThisUser = await isBlockedByUser(user.id);

  if (isBlockedByThisUser) {
    notFound();
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  );
};

export default UserPage;
