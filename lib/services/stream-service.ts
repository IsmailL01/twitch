import { db } from '@/lib/db';

export const getStreamByUserId = async (userId: string) => {
  const stream = db.stream.findUnique({
    where: { userId },
  });

  return stream;
};
