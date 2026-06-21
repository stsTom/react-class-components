interface MovieInfo {
  id: string;
  title: string;
  details: string;
}

interface Data {
  movies: MovieInfo[];
  pagesCount: number;
}

const apiUrl = 'https://stapi.co/api';

export async function fetchData(searchRequest: string, pageNumber: number) {
  const searchParams = new URLSearchParams({
    title: searchRequest ?? '',
  });
  const paginationParams = new URLSearchParams({
    pageNumber: (pageNumber - 1).toString(),
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

    const responseData: Data = { movies: [], pagesCount: 0 };

    for (const movie of searchResults.movies) {
      responseData.movies.push({
        id: movie.uid,
        title: movie.title,
        details: movie.usReleaseDate,
      });
    }

    responseData.pagesCount = searchResults.page.totalPages;

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function fetchItemData(itemId: string) {
  const searchParams = new URLSearchParams({
    uid: itemId,
  });
  const fullUrl = `${apiUrl}/v1/rest/movie?${searchParams.toString()}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        errorBody.message || `HTTP error! status: ${response.status}`
      );
    }

    const searchResults = await response.json();
    const responseData = searchResults;

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
