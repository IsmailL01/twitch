// user
import { currentUser } from '@clerk/nextjs';

//db
import { db } from '@/lib/db';
import { ErrorText } from '@/lib/UIText/error';
import { User } from '@prisma/client';

export const getSelf = async () => {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error(ErrorText.UNAUTHORIZED);
  }

  const user: User | null = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    throw new Error(ErrorText.NOT_FOUND_USER);
  }
  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error('Unauthorized');
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (self.username !== user.username) {
    throw new Error('Unauthorized');
  }

  return user;
};
