'use server';

import { getSelf } from '@/lib/services/auth-service';
import { blockUser, unBlockUser } from '@/lib/services/block-service';
import { RoomServiceClient } from 'livekit-server-sdk';
import { revalidatePath } from 'next/cache';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const self = await getSelf();

  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch {
    // This means user is a guest
  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch {
    // This means user is not in the room
  }
  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
};

export const onUnBlock = async (id: string) => {
  const unBlockedUser = await unBlockUser(id);
  const self = await getSelf();

  revalidatePath(`/u/${self.username}/community`);

  return unBlockedUser;
};
