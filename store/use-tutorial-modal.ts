import { create } from "zustand";

type TutorialModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useTutorialModal = create<TutorialModalState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
