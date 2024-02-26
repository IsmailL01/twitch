'use client';

import { updateStream } from '@/src/actions/stream';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { Switch } from '@/src/components/ui/switch';
import { useTransition } from 'react';
import { toast } from 'sonner';

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
}

const ToggleCard = (props: ToggleCardProps) => {
  const { label, value, field } = props;
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success('Chat settings updated'))
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <div className='rounded-xl bg-muted p-6'>
      <div className='flex items-center justify-between'>
        <p className='font-semibold shrink-0'>{label}</p>
        <div className='space-y-2'>
          <Switch
            onCheckedChange={onChange}
            disabled={isPending}
            checked={value}
          >
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ToggleCard;

export const ToggleCardSkeleton = () => {
  return <Skeleton className='rounded-xl pl-10 w-full' />;
};