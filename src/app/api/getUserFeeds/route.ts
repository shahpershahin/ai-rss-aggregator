// app/api/getUserFeeds/route.ts

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Feed from '../../../models/Feed';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userEmail = url.searchParams.get('userEmail');

  if (!userEmail) {
    return NextResponse.json({ message: 'User email is required' }, { status: 400 });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const feeds = await Feed.find({ userEmail });
    return NextResponse.json({ feeds });
  } catch (err) {
    console.error('Error fetching user feeds:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
