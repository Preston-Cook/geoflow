import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') as string;

  const [subDomain, domain] = origin.split(/\.(.*)/s);

  console.log('test');

  return NextResponse.json('test');
}
