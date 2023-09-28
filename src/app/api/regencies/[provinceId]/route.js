import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { provinceId } = params;

  const res = await fetch(
    `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}
