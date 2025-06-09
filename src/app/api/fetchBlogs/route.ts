import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import OpenAI from 'openai';
import { categorizeBlog } from '../../../utils/categorize';


const parser: Parser = new Parser();
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const FEEDS: string[] = [
  'https://www.theverge.com/rss/index.xml',
  'https://techcrunch.com/feed/',
];

type BlogItem = {
  title: string;
  link: string;
  summary: string;
  category: string;
};

export async function GET() {
  console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
  try {
    const items: BlogItem[] = [];

    for (const feedUrl of FEEDS) {
      const feed = await parser.parseURL(feedUrl);
      for (const item of feed.items.slice(0, 3)) {
        const summary = await summarizeText(item.contentSnippet || item.content || item.title || '');
        items.push({
          title: item.title || 'Untitled',
          link: item.link || '#',
          summary,
          category: categorizeBlog(item.title || ''),
        });
      }
    }

    return NextResponse.json({ blogs: items });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function summarizeText(text: string): Promise<string> {
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


