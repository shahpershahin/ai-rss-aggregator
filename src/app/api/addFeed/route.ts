// app/api/addFeed/route.ts

import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb'; // Make sure path is correct (adjust as needed)
import Feed from '../../../models/Feed'; // Adjust to your model path

export async function POST(req: Request) {
  const { rssUrl } = await req.json();

  if (!rssUrl) {
    return NextResponse.json({ message: 'RSS URL is required' }, { status: 400 });
  }

  const { db } = await connectToDatabase(); // ⬅️ this is your actual DB connector

  const existing = await db.collection('feeds').findOne({ url: rssUrl });
  if (existing) {
    return NextResponse.json({ message: 'Feed already exists' }, { status: 200 });
  }

  await db.collection('feeds').insertOne({ url: rssUrl });
  return NextResponse.json({ message: 'Feed added successfully' }, { status: 201 });
}
