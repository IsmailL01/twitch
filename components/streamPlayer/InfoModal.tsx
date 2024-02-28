'use client';
import { Button } from '@/components/ui/Button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/Input';
import { Hint, HintSides } from '@/components/Hint';
import {
  ChangeEvent,
  FormEvent,
  useState,
  useTransition,
  useRef,
  ElementRef,
} from 'react';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';
import { UploadDropzone } from '@/lib/uploadthing';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Trash } from 'lucide-react';

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = (props: InfoModalProps) => {
  const { initialName, initialThumbnailUrl } = props;
  const [name, setName] = useState(initialName);
  const router = useRouter();
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // startTransition(() => {
    //   updateStream({ name })
    //     .then(() => {
    //       toast.success('Stream updated');
    //       closeRef.current?.click();
    //     })
    //     .catch(() => toast.error('Something went wrong'));
    // });
  };

  const onRemoveThumbnail = () => {
    // startTransition(() => {
    //   updateStream({ thumbnailUrl: null })
    //     .then(() => {
    //       toast.success('Thumbnail removed');
    //       setThumbnailUrl(null);
    //       closeRef.current?.click();
    //     })
    //     .catch(() => toast.error('Something went wrong'));
    // });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='link' size='sm' className='ml-auto'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form className='space-y-14' onSubmit={onSubmit}>
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input
              placeholder='Stream name'
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className='space-y-2'>
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
                <div className='absolute top-2 right-2 z-[10]'>
                  <Hint asChild side={HintSides.LEFT} label='Remove thumbnail'>
                    <Button
                      className='h-auto w-auto p-1.5'
                      type='button'
                      disabled={isPending}
                      onClick={onRemoveThumbnail}
                    >
                      <Trash className='h-4 w-4' />
                    </Button>
                  </Hint>
                </div>
                <Image
                  className='object-cover'
                  src={thumbnailUrl}
                  alt='thumbnail'
                  fill
                />
              </div>
            ) : (
              <div className='rounded-xl border outline-dashed outline-muted'>
                <UploadDropzone
                  endpoint='thumbnailUploader'
                  appearance={{
                    label: {
                      color: '#FFFFFF',
                    },
                    allowedContent: {
                      color: '#FFFFFF',
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                    closeRef.current?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className='flex justify-between'>
            <DialogClose ref={closeRef} asChild>
              <Button type='button' variant='ghost'>
                Cancel
              </Button>
            </DialogClose>
            <Button variant='primary' type='submit' disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
