import { useSelectionStore } from '../../store/useSelectionStore';

export function SelectionFlyout() {
  const selectedItems = useSelectionStore((s) => s.selectedItems);
  const clearSelection = useSelectionStore((s) => s.clearSelection);
  const downloadSelection = useSelectionStore((s) => s.downloadSelection);

  return (
    <nav id="selection-flyout">
      <ul>
        <li>
          <strong>
            You've selected {selectedItems.length}
            {selectedItems.length > 1 ? ' items' : ' item'}
          </strong>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={() => downloadSelection()}>Download all</button>
        </li>
        <li>
          <button onClick={() => clearSelection()}>Clear all</button>
        </li>
      </ul>
    </nav>
  );
}
