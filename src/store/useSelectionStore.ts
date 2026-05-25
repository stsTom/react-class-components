import { create } from 'zustand';
import { fetchItemData } from '../utils/searchEngine';

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

    const rows: string[] = ['title,director,usReleaseDate'];

    for (const id of selectedItems) {
      console.log(id);
      const movieData = await fetchItemData(id);
      if (movieData) {
        rows.push(
          `"${movieData.movie.title}","${movieData.movie.mainDirector.name}","${movieData.movie.usReleaseDate}"`
        );
      }
    }

    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `${selectedItems.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  },

  clearSelection: () => set({ selectedItems: [] }),
}));
