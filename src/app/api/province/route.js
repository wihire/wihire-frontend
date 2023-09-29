import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json', {
    headers: {
      'Content-Type': 'application/json'
    },
    next: {
      revalidate: 60 * 60 * 24 * 365 // 1 year
    }
  });
  const data = await res.json();

  return NextResponse.json(data);
}
