// app/api/addFeed/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import Feed from '../../../models/Feed';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { rssUrl } = await req.json();
  if (!rssUrl) {
    return NextResponse.json({ message: 'RSS URL required' }, { status: 400 });
  }

  await mongoose.connect(process.env.MONGODB_URI!);
  const existing = await Feed.findOne({ url: rssUrl, userEmail: session.user.email });
  if (existing) {
    return NextResponse.json({ message: 'Feed already exists' });
  }

  await Feed.create({ url: rssUrl, userEmail: session.user.email });
  return NextResponse.json({ message: 'Feed added successfully' });
}
