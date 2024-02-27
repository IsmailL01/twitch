'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/textarea';
import {
  ChangeEvent,
  useState,
  useTransition,
  useRef,
  ElementRef,
  FormEvent,
} from 'react';
import { updateUser } from '@/actions/user';
import { toast } from 'sonner';

interface BioModalProps {
  initialValue: string | null;
}

export const BioModal = (props: BioModalProps) => {
  const { initialValue } = props;
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [value, setValue] = useState(initialValue || '');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success('User bio updated');
          closeRef.current?.click();
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const onHandleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='ml-auto' variant='link' size='sm'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form className='space-y-4' onSubmit={onSubmit}>
          <Textarea
            className='resize-none'
            disabled={isPending}
            value={value}
            placeholder='User bio'
            onChange={onHandleChange}
          />
          <div className='flex justify-between'>
            <DialogClose asChild>
              <Button type='button' variant='ghost'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              ref={closeRef}
              disabled={isPending}
              type='submit'
              variant='primary'
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
