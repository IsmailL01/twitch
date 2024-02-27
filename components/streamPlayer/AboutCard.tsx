import { VerifiedMark } from '@/components/VerifiedMark';
import { BioModal } from './BioModule';

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}

const AboutCard = (props: AboutCardProps) => {
  const { hostName, hostIdentity, viewerIdentity, bio, followedByCount } =
    props;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;

  const followByLabel = followedByCount === 1 ? ' follower' : ' followers';

  return (
    <div className='px-4'>
      <div className='group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-2 font-semibold text-lg lg:text-2xl'>
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className='text-sm text-muted-foreground'>
          <span className='font-semibold text-primary'>{followedByCount}</span>
          {followByLabel}
        </div>
        <p className='text-sm'>
          {bio || 'This user prefer to keep an air of mystery about them.'}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
