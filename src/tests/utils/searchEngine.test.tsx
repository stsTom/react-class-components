import { fetchData } from '../../utils/searchEngine';

describe('fetchData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns mapped data when response is ok', async () => {
    const mockResponse = {
      movies: [
        { uid: '1', title: 'Star Trek', usReleaseDate: '1979-12-07' },
        { uid: '2', title: 'Star Trek II', usReleaseDate: '1982-06-04' },
      ],
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    } as unknown as Response);

    const result = await fetchData('Star Trek');

    expect(result).toEqual([
      { id: '1', title: 'Star Trek', details: '1979-12-07' },
      { id: '2', title: 'Star Trek II', details: '1982-06-04' },
    ]);
  });

  it('throws an error when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({ message: 'Internal Server Error' }),
    } as unknown as Response);

    await expect(fetchData('Star Trek')).rejects.toThrow(
      'Internal Server Error'
    );
  });

  it('throws an error when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));

    await expect(fetchData('Star Trek')).rejects.toThrow('Network Error');
  });
});
