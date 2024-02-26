'use client';

import { MessagesSquare, Users } from 'lucide-react';
import { Hint, HintSides } from '@/src/components/Hint';
import { Button } from '@/src/components/ui/Button';
import { ChatVariant, useChatSidebar } from '@/src/store/use-chat-sidebar';

interface VariantToggleProps {}

export const VariantToggle = (props: VariantToggleProps) => {
  const { variant, onChangeVariant } = useChatSidebar();

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessagesSquare;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  const label = isChat ? 'Community' : 'Go back to chat';

  return (
    <Hint label={label} side={HintSides.LEFT}>
      <Button
        className='h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent'
        onClick={onToggle}
        variant='ghost'
      >
        <Icon className='h-4 w-4' />
      </Button>
    </Hint>
  );
};
