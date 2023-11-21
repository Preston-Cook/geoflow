import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/db';
import { Resend } from 'resend';

type IPInfoResponse = {
  loc?: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
  postal: string;
  timezone: string;
};

export async function POST(req: NextRequest) {
  const ip: string = (await req.json()).ip ?? req.ip;

  if (!ip) {
    return NextResponse.json({ message: 'No IP Address' }, { status: 400 });
  }

  // Get coordinates from IP address
  const accessToken = process.env.IP_INFO_ACCESS_TOKEN;

  const res = await fetch(`https://www.ipinfo.io/${ip}?token=${accessToken}`);
  const data = await res.json();

  const { loc, city, region, country, org, postal, timezone } =
    data as IPInfoResponse;

  if (!loc) {
    return NextResponse.json({ message: 'No IP Address' }, { status: 400 });
  }

  const [lat, lng] = loc.split(',').map((el) => Number(el));

  const origin = req.headers.get('origin') as string;

  const [subDomain] = origin.split(/\.(.*)/s);

  const domain = subDomain.slice(subDomain.lastIndexOf('/') + 1);

  await prisma.domain.upsert({
    where: {
      domain,
    },
    update: {
      visits: {
        create: {
          lat,
          lng,
          ip,
          city,
          region,
          country,
          org,
          postal,
          timezone,
        },
      },
    },
    create: {
      domain,
      visits: {
        create: {
          lat,
          lng,
          ip,
          city,
          region,
          country,
          org,
          postal,
          timezone,
        },
      },
    },
  });

  return NextResponse.json({ ip: req.ip });
}
