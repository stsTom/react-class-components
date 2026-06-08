import { create } from 'zustand';

interface ModalSlice {
  isOpen: boolean;
  setIsOpen: () => void;
}

const initialState = {
  isOpen: false,
};

export const useModalStore = create<ModalSlice>((set, get) => ({
  ...initialState,

  setIsOpen: () => {
    set({ isOpen: !get().isOpen });
  },
}));
