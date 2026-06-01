export const movieKeys = {
  all: ['movies'] as const,
  movieInfoList: () => [...movieKeys.all, 'movieInfo'] as const,
  movieInfo: (search: string, page: number) =>
    [...movieKeys.movieInfoList(), { search, page }] as const,
  detailsList: () => [...movieKeys.all, 'details'] as const,
  details: (id: string) => [...movieKeys.detailsList(), id] as const,
} as const;
