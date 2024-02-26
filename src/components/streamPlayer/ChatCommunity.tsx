import { useParticipants } from '@livekit/components-react';
import { useMemo, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { Input } from '@/src/components/ui/Input';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import { CommunityItem } from './CommunityItem';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';

interface ChatCommunity {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}

export const ChatCommunity = (props: ChatCommunity) => {
  const { viewerName, hostName, isHidden } = props;
  const [value, setValue] = useState('');
  const debouncedValue = useDebounceValue(value, 500);

  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;

      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }

      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue[0].toLowerCase());
    });
  }, [participants, debouncedValue]);

  // []
  if (isHidden) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-sm text-muted-foreground'>Community is disabled</p>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <Input
        className='border-white/10'
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search community'
      />
      <ScrollArea className='gap-y-2 mt-4'>
        <p className='text-center text-sm text-muter-foreground hidden last:block p-2'>
          No result
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
