'use server';

import { Button } from '@/src/components/ui/Button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

export const Actions = () => {
  return (
    <div className='flex items-center justify-end gap-x-2'>
      <Button
        className='text-muted-foreground hover:text-primary'
        asChild
        size='sm'
        variant='ghost'
      >
        <Link href={'/'}>
          <LogOut className='h-5 w-5 mr-2' />
          Exit
        </Link>
      </Button>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};
