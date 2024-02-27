import React from 'react';
import { SignUp, UserButton } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className='flex flex-col gap-y-4'>
      <h1>Dashboard</h1>
      <UserButton afterSignOutUrl='/' />
      <SignUp />
    </div>
  );
};

export default Page;
