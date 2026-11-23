import { markTutorialAsSeen } from "@/actions/onboarding";
import { create } from "zustand";

type TutorialModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  handleClose: () => void;
};

export const useTutorialModal = create<TutorialModalState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  handleClose: () => {
    set({ isOpen: false });
    markTutorialAsSeen();
  },
}));
