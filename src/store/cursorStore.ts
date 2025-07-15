import { create } from 'zustand';

type CursorState = {
  cursorType: 'default' | 'contact';
  setCursorType: (type: 'default' | 'contact') => void;
};

export const useCursorStore = create<CursorState>((set) => ({
  cursorType: 'default',
  setCursorType: (type) => set({ cursorType: type }),
})); 