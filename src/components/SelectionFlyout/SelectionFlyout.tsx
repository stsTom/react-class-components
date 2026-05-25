import { useSelectionStore } from '../../store/useSelectionStore';

export function SelectionFlyout() {
  const selectedItems = useSelectionStore((s) => s.selectedItems);
  const clearSelection = useSelectionStore((s) => s.clearSelection);

  return (
    <nav id="selection-flyout">
      <ul>
        <li>
          <strong>You've selected {selectedItems.length} items</strong>
        </li>
      </ul>
      <ul>
        <li>
          <button>Download all</button>
        </li>
        <li>
          <button onClick={() => clearSelection()}>Clear all</button>
        </li>
      </ul>
    </nav>
  );
}
