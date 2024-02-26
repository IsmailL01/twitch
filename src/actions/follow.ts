'use server';

import { revalidatePath } from 'next/cache';

import { followUser, unFollow } from '@/src/lib/services/follow-service';

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath('/');

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (err) {
    throw new Error('Internal error');
  }
};

export const onUnFollow = async (id: string) => {
  try {
    const unFollowedUser = await unFollow(id);

    revalidatePath('/');

    if (unFollowedUser) {
      revalidatePath(`/${unFollowedUser.following.username}`);
    }
    return unFollowedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
};
