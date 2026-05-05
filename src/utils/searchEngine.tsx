interface data {
  id: string;
  title: string;
  details: string;
}

export async function fetchData(searchRequest: string) {
  const apiUrl = 'https://stapi.co/api';
  const searchParams = new URLSearchParams({
    title: searchRequest ?? '',
  });
  const paginationParams = new URLSearchParams({
    pageNumber: '0',
    pageSize: '7',
  });
  const fullUrl = `${apiUrl}/v1/rest/movie/search?${paginationParams.toString()}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: searchParams.toString(),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        errorBody.message || `HTTP error! status: ${response.status}`
      );
    }

    const searchResults = await response.json();

    const responseData: data[] = [];

    for (const movie of searchResults.movies) {
      responseData.push({
        id: movie.uid,
        title: movie.title,
        details: movie.usReleaseDate,
      });
    }

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export function simulateError() {
  throw new Error('Test error');
}
