import type { Character } from '@entities';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const characters: Character[] = await request.json();

    const headers = Object.keys(characters[0] || {}).join(', ');

    const formattedData = characters
      .map((item) =>
        Object.values(item)
          .map((value) => (value === null ? 'Unknown' : value))
          .join(', ')
      )
      .join('\n');

    const csv = [headers, formattedData].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=export.csv',
      },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
