import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();

  return NextResponse.json(data);
}
