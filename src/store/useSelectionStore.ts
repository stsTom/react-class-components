import { create } from 'zustand';

interface SelectionSlice {
  selectedItems: Array<string>;
  manageSelection: (itemId: string) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionSlice>((set) => ({
  selectedItems: [],

  manageSelection: (selectedItem) =>
    set((state) => {
      if (state.selectedItems.includes(selectedItem)) {
        return {
          selectedItems: state.selectedItems.filter(
            (item) => item !== selectedItem
          ),
        };
      }
      return { selectedItems: [...state.selectedItems, selectedItem] };
    }),

  clearSelection: () => set({ selectedItems: [] }),
}));
