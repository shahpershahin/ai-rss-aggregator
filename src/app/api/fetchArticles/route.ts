// app/api/fetchArticles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ articles: [] });
  }

  try {
    const feed = await parser.parseURL(url);
    const articles = feed.items?.slice(0, 10) || [];
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ articles: [] });
  }
}
