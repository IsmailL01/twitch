import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { ErrorText } from '@/lib/UIText/error';
import { resetIngresses } from '@/actions/ingress';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(ErrorText.CLERK_SECRET_KEY);
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response(ErrorText.NO_SVIX_HEADERS, {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response(ErrorText.ERROR_OCCURED, {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    await db.user.create({
      data: {
        username: payload.data.username,
        externalUserId: payload.data.id,
        imageUrl: payload.data.image_url,
        stream: {
          create: {
            name: `${payload.data.username}'s stream`,
          },
        },
      },
    });
  }

  if (eventType === 'user.updated') {
    const currentUser = await db.user.findUnique({
      where: {
        externalUserId: payload.data.id,
      },
    });
    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }

  if (eventType === 'user.deleted') {
    await resetIngresses(payload.data.id);
    await db.user.delete({
      where: {
        externalUserId: payload.data.id,
      },
    });
  }
  return new Response('', { status: 200 });
}
