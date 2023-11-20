import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/db';

export async function POST(req: NextRequest) {
  const ip: string = (await req.json()).ip ?? req.ip;

  if (!ip) {
    return NextResponse.json({ message: 'No IP Address' }, { status: 400 });
  }

  // Get coordinates from IP address
  const accessToken = process.env.IP_INFO_ACCESS_TOKEN;

  const res = await fetch(`https://www.ipinfo.io/${ip}?token=${accessToken}`);
  const loc: string | undefined = (await res.json()).loc;

  if (!loc) {
    return NextResponse.json({ message: 'No IP Address' }, { status: 400 });
  }

  const [lat, lng] = loc.split(',');

  const origin = req.headers.get('origin') as string;

  const [subDomain] = origin.split(/\.(.*)/s);

  const domain = subDomain.slice(subDomain.lastIndexOf('/') + 1);

  await prisma.domain.upsert({
    where: {
      domain,
    },
    update: {
      coordinates: {
        create: {
          lat,
          lng,
        },
      },
    },
    create: {
      domain,
      coordinates: {
        create: {
          lat,
          lng,
        },
      },
    },
  });

  return NextResponse.json({ ip: req.ip });
}
