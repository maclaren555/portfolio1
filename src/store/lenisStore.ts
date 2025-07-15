import { create } from 'zustand';
import Lenis from 'lenis';

interface LenisState {
  lenis: Lenis | null;
  setLenis: (lenis: Lenis | null) => void;
}

export const useLenisStore = create<LenisState>((set) => ({
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
})); 