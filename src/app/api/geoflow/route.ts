import { NextRequest, NextResponse } from 'next/server';
import getConfig from 'next/config';
import path from 'path';
import { promises as fs } from 'fs';
import { streamFile } from '../../../../lib/streamFile';

export async function GET(request: NextRequest) {
  const { serverRuntimeConfig } = getConfig();

  // Create file path to script
  const filePath = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    './public',
    'script.js'
  );

  //
  const { size } = await fs.stat(filePath);
  const data: ReadableStream = streamFile(filePath);

  return new NextResponse(data, {
    status: 200,
    headers: {
      'content-disposition': 'attachment; filename="script.js"',
      'content-type': 'text/javascript',
      'content-length': `${size}`,
    },
  });
}
