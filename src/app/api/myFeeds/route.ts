import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Feed from '../../../models/Feed';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'You must be logged in to view your feeds.' }, { status: 401 });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const feeds = await Feed.find({ userEmail: session.user.email });

    // Enrich feeds with title from the actual RSS if not already stored
    const enrichedFeeds = await Promise.all(feeds.map(async (feed) => {
      if (!feed.title) {
        try {
          const parsedFeed = await parser.parseURL(feed.url);
          feed.title = parsedFeed.title || 'Untitled Feed';
          await feed.save(); // Save the title for future use
        } catch (err) {
          console.error(`Error fetching title for ${feed.url}:`, err);
        }
      }
      return { _id: feed._id, url: feed.url, title: feed.title };
    }));

    return NextResponse.json(enrichedFeeds);
  } catch (err) {
    console.error('Error fetching user feeds:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
