import { create } from 'zustand';

interface SelectionSlice {
  selectedItems: Array<string>;
  manageSelection: (itemId: string) => void;
  clearSelection: () => void;
  downloadSelection: () => Promise<void>;
}

export const useSelectionStore = create<SelectionSlice>((set, get) => ({
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

  downloadSelection: async () => {
    const { selectedItems } = get();

    const response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedItems }),
    });

    if (!response.ok) throw new Error('Failed to generate CSV');

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `${selectedItems.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
},

  clearSelection: () => set({ selectedItems: [] }),
}));
