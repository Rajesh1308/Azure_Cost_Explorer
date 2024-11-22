import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://prices.azure.com/api/retail/prices?api-version=2023-01-01-preview'
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 