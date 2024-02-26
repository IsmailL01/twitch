import { db } from '@/lib/db';
import { getSelf } from './auth-service';
import { notFound } from 'next/navigation';

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      notFound();
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findFirst({
      where: {
        blockedId: otherUser.id,
        blockerId: self.id,
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error('Cannot block yourself');
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  const existingBlock = await db.block.findFirst({
    where: {
      blockerId: self.id,
      blockedId: otherUser.id,
      // id: self.id,
    },
  });

  if (existingBlock) {
    throw new Error('Already has blocked');
  }

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });
  return block;
};

export const unBlockUser = async (id: string) => {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error('Cannot unblock yourself');
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  const existingBlock = await db.block.findFirst({
    where: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
  });

  if (!existingBlock) {
    throw new Error('Not blocked');
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unblock;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = db.block.findMany({
    where: {
      blockerId: self.id,
    },

    include: {
      blocked: true,
    },
  });

  return blockedUsers;
};
