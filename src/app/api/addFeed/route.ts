// app/api/addFeed/route.ts

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Feed from '../../../models/Feed';

export async function POST(req: Request) {
  const { rssUrl, userEmail } = await req.json();

  if (!rssUrl || !userEmail) {
    return NextResponse.json({ message: 'RSS URL and userEmail are required' }, { status: 400 });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const existing = await Feed.findOne({ url: rssUrl, userEmail });
    if (existing) {
      return NextResponse.json({ message: 'Feed already exists' }, { status: 200 });
    }

    await Feed.create({ url: rssUrl, userEmail });
    return NextResponse.json({ message: 'Feed added successfully' }, { status: 201 });
  } catch (err) {
    console.error('Error adding feed:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
