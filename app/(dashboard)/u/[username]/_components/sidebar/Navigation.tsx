'use client';

import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react';
import NavItem, { NavItemSkeleton } from './NavItem';

export const Navigation = () => {
  const pathName = usePathname();
  const { user } = useUser();

  const isActive = (currentRoute: string) => {
    return () => pathName === currentRoute;
  };

  const routes = [
    {
      label: 'Stream',
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: 'Keys',
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: 'Chat',
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: 'Community',
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <ul className='space-y-2'>
        {[...Array(4)].map((_, index) => (
          <NavItemSkeleton key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
      {routes.map((route) => {
        return (
          <NavItem
            key={route.href}
            label={route.label}
            Icon={route.icon}
            href={route.href}
            isActive={isActive(route.href)()}
          />
        );
      })}
    </ul>
  );
};
