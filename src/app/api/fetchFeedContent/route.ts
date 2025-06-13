import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ message: 'Feed URL is required' }, { status: 400 });
  }

  try {
    const feed = await parser.parseURL(url);
    return NextResponse.json(feed);
  } catch (err) {
    console.error('Error fetching RSS content:', err);
    return NextResponse.json({ message: 'Failed to parse RSS feed' }, { status: 500 });
  }
}
