import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import OpenAI from 'openai';
import { categorizeBlog } from '@/utils/categorize';

const parser = new Parser();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const FEEDS = [
  'https://www.theverge.com/rss/index.xml',
  'https://techcrunch.com/feed/'
];

export type BlogItem = {
  title: string;
  link: string;
  summary: string;
  category: string;
};

export async function GET() {
  try {
    const blogs: BlogItem[] = [];
    for (const url of FEEDS) {
      const feed = await parser.parseURL(url);
      for (const item of feed.items.slice(0, 3)) {
        const summary = await summarize(item.contentSnippet || item.content || item.title || '');
        blogs.push({
          title: item.title || 'Untitled',
          link: item.link || '#',
          summary,
          category: categorizeBlog(item.title || '')
        });
      }
    }
    return NextResponse.json({ blogs });
  } catch (err: any) {
    console.error('Error in fetchBlogs:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


async function summarize(text: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: false,
      messages: [{ role: 'user', content: `Summarize this blog: ${text}` }],
    });

    return completion.choices[0]?.message?.content?.trim() || 'No summary available.';
  } catch (err) {
    console.error('OpenAI summarizeText error:', err);
    return 'Summary unavailable due to an error.';
  }
}


