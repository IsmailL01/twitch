import { setType } from '@/src/types/store.types';
import { create } from 'zustand';

interface CreatorSidebarStore {
  collapsed: boolean;
  onCollapse: () => void;
  onExpand: () => void;
}

const createCreatorSidebar = (set: setType<CreatorSidebarStore>) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
});

export const useCreatorSidebar =
  create<CreatorSidebarStore>(createCreatorSidebar);
