import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db';
import resend from '../../../../lib/resend';

export async function POST(req: Request) {
  const body = await req.json();

  const { email, subject, message } = body;

  const msg = `
  ${message}

  - ${email}
  `;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['preston.l.cook@gmail.com'],
    subject,
    text: msg,
  });

  await prisma.contact.create({
    data: {
      email,
      subject,
      message,
    },
  });

  return NextResponse.json(
    { message: 'Created' },
    {
      status: 201,
    }
  );
}
