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

  const searchResults = await fetch(fullUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: searchParams.toString(),
  }).then((result) => result.json());

  console.log(searchParams.toString());
  const response: data[] = [];

  for (const movie of searchResults.movies) {
    response.push({
      id: movie.uid,
      title: movie.title,
      details: movie.usReleaseDate,
    });
  }

  return response;
}
