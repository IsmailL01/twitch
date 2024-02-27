import { setType } from '@/types/store.types';
import { create } from 'zustand';

export enum ChatVariant {
  CHAT = 'CHAT',
  COMMUNITY = 'COMMUNITY',
}

interface ChatSidebarStore {
  collapsed: boolean;
  variant: ChatVariant;
  onCollapse: () => void;
  onExpand: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

const createChatSidebar = (set: setType<ChatSidebarStore>) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
  variant: ChatVariant.CHAT,
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
});

export const useChatSidebar = create<ChatSidebarStore>(createChatSidebar);
