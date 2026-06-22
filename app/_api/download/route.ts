import { NextRequest, NextResponse } from 'next/server';
import { fetchItemData } from '../../../src/utils/searchEngine'

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { ids }: { ids: string[] } = await req.json();

  const rows: string[] = ['title,director,usReleaseDate'];

  await Promise.all(
    ids.map(async (id) => {
      const movieData = await fetchItemData(id);
      if (movieData) {
        rows.push(
          `"${movieData.movie.title}","${movieData.movie.mainDirector.name}","${movieData.movie.usReleaseDate}"`
        );
      }
    })
  );

  const csv = rows.join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${ids.length}_items.csv"`,
    },
  });
}