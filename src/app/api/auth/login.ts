// app/api/auth/login/route.ts
import { connectToDatabase } from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ success: true, email: user.email });
}
