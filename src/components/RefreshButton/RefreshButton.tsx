import { queryClient, movieKeys } from '../../store';

export function RefreshButton() {
  const handleRefresh = async () => {
    await queryClient.invalidateQueries({
      queryKey: movieKeys.all,
    });
  };

  return (
    <button onClick={handleRefresh} aria-label="Refresh">
      Refresh
    </button>
  );
}
