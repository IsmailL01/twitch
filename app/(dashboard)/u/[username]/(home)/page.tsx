import { StreamPlayer } from '@/components/streamPlayer/StreamPlayer';
import { getUserByUsername } from '@/lib/services/user-service';
import { currentUser } from '@clerk/nextjs';

interface CreatorPageProps {
  params: { username: string };
}

const CreatorPage = async (props: CreatorPageProps) => {
  const { params } = props;

  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error('Unauthorized');
  }

  return (
    <div className='h-full'>
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
};

export default CreatorPage;
