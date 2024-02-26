import { setType } from '@/src/types/store.types';
import { create } from 'zustand';

interface SidebarStore {
  collapsed: boolean;
  onCollapse: () => void;
  onExpand: () => void;
}

const createCollapseHandler = (set: setType<SidebarStore>) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
});

export const useSidebar = create<SidebarStore>(createCollapseHandler);
