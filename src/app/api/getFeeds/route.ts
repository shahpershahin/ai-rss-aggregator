// app/api/getFeeds/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import Feed from '../../../models/Feed';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ feeds: [] });
  }

  await mongoose.connect(process.env.MONGODB_URI!);
  const feeds = await Feed.find({ userEmail: session.user.email });
  return NextResponse.json({ feeds });
}
