import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (req.method === 'GET' || req.method === 'POST') {
    const origin = req.headers.get('origin');

    if (!origin) {
      return NextResponse.json({ message: 'invalid origin' }, { status: 400 });
    }

    if (process.env.NODE_ENV === 'production') {
      if (!/^.+\.azurewebsites.net$/.test(origin)) {
        return NextResponse.json(
          { message: 'invalid origin' },
          { status: 400 }
        );
      } else {
        res.headers.set('Access-Control-Allow-Origin', origin);
      }
    } else {
      res.headers.set('Access-Control-Allow-Origin', '*');
    }
  }

  return res;
}

export const config = {
  matcher: ['/script.js', '/api/geoflow'],
};
