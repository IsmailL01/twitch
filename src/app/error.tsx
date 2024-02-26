'use client';

import { Button } from '@/src/components/ui/Button';
import Link from 'next/link';
import React from 'react';

const ErrorPage = () => {
  return (
    <div className='h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground'>
      <p>Something went wrong</p>
      <Button variant='secondary' asChild>
        <Link href='/'>Go back home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;