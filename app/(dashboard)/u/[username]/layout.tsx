import { getSelfByUsername } from '@/lib/services/auth-service';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';
import { Container } from './_components/container/Container';

interface CreatorLayoutProps {
  children: ReactNode;
  params: { username: string };
}

const CreatorLayout = async (props: CreatorLayoutProps) => {
  const {
    children,
    params: { username },
  } = props;

  const self = await getSelfByUsername(username);

  if (!self) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      <div className='flex h-full pt-20'>
        <Sidebar />
        <Container>{children}</Container>
      </div>
      ;
    </>
  );
};

export default CreatorLayout;
