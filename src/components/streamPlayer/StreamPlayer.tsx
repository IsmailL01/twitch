'use client';
import { useChatSidebar } from '@/src/store/use-chat-sidebar';
import { useViewerToken } from '@/src/lib/hooks/useViewerToken';

import { Stream, User } from '@prisma/client';

import { Video, VideoSkeleton } from './Video';
import { Chat, ChatSkeleton } from './Chat';

import { cn } from '@/src/lib/utils';

import { LiveKitRoom } from '@livekit/components-react';
import { ChatToggle } from './ChatToggle';
import { Header, HeaderSkeleton } from './Header';
import { InfoCard } from './InfoCard';
import AboutCard from './AboutCard';

type CustomStream = {
  id: string;
  name: string;
  thumbnailUrl: string | null;
  isLive: boolean;
  isChatDelayed: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
};

type CustomUser = {
  id: string;
  username: string;
  bio: string | null;
  imageUrl: string;
  stream: CustomStream | null;
  _count: { followedBy: number };
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

export const StreamPlayer = (props: StreamPlayerProps) => {
  const { user, stream, isFollowing } = props;

  const { isChatEnabled, isChatDelayed, isChatFollowersOnly } = stream;

  const { name, token, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar();

  const {
    id,
    username,
    _count: { followedBy },
  } = user;

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className='hidden lg:block fixed top-[100px] right-2 z-50'>
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        className={cn(
          'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
        )}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      >
        <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10'>
          <Video hostName={user.username} hostIdentity={user.id} />
          <Header
            hostName={username}
            hostIdentity={id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostName={username}
            hostIdentity={id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={followedBy}
          />
        </div>

        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            viewerName={name}
            hostName={username}
            hostIdentity={id}
            isFollowing={isFollowing}
            isChatEnabled={isChatEnabled}
            isChatDelayed={isChatDelayed}
            isChatFollowersOnly={isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className='grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full'>
      <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-auto hidden-scrollbar pb-10'>
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className='col-span-1 bg-background'>
        <ChatSkeleton />
      </div>
    </div>
  );
};
