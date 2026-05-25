import { useSelectionStore } from '../../store/useSelectionStore';
import * as searchEngine from '../../utils/searchEngine';

const mockMovieData = (id: string) => ({
  movie: {
    title: `Movie ${id}`,
    mainDirector: { name: `Director ${id}` },
    usReleaseDate: '2000-01-01',
  },
});

afterEach(() => {
  vi.restoreAllMocks();
  useSelectionStore.setState({ selectedItems: [] });
});

describe('useSelectionStore', () => {
  describe('manageSelection', () => {
    it('adds an item id when it is not already selected', () => {
      useSelectionStore.getState().manageSelection('1');

      expect(useSelectionStore.getState().selectedItems).toContain('1');
    });

    it('removes an item id when it is already selected', () => {
      useSelectionStore.setState({ selectedItems: ['1'] });

      useSelectionStore.getState().manageSelection('1');

      expect(useSelectionStore.getState().selectedItems).not.toContain('1');
    });

    it('does not affect other selected items when removing one', () => {
      useSelectionStore.setState({ selectedItems: ['1', '2'] });

      useSelectionStore.getState().manageSelection('1');

      expect(useSelectionStore.getState().selectedItems).toContain('2');
    });
  });

  describe('clearSelection', () => {
    it('empties selectedItems', () => {
      useSelectionStore.setState({ selectedItems: ['1', '2', '3'] });

      useSelectionStore.getState().clearSelection();

      expect(useSelectionStore.getState().selectedItems).toHaveLength(0);
    });
  });

  describe('downloadSelection', () => {
    beforeEach(() => {
      globalThis.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock');
      globalThis.URL.revokeObjectURL = vi.fn();
    });

    it('fetches data for each selected item', async () => {
      const fetchItemData = vi
        .spyOn(searchEngine, 'fetchItemData')
        .mockResolvedValue(mockMovieData('1'));

      useSelectionStore.setState({ selectedItems: ['1', '2'] });

      await useSelectionStore.getState().downloadSelection();

      expect(fetchItemData).toHaveBeenCalledTimes(2);
      expect(fetchItemData).toHaveBeenCalledWith('1');
      expect(fetchItemData).toHaveBeenCalledWith('2');
    });
  });
});
