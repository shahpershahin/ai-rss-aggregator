import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { verifyPassword } from '../../../../lib/auth';
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 9200,
  });

  return response;
}
