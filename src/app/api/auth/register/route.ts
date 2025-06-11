import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { hashPassword } from '../../../../lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password || password.length < 6) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  const { db } = await connectToDatabase();

  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 422 });
  }

  const hashedPassword = await hashPassword(password);
  await db.collection('users').insertOne({ email, password: hashedPassword });

  return NextResponse.json({ message: 'User created!' }, { status: 201 });
}
