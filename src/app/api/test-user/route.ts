import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import UserModel from '../../../models/User';

export async function GET() {
  await connectDB();

  // Create a test user if not exists
  let user = await UserModel.findOne({ email: 'test@example.com' });
  if (!user) {
    user = await UserModel.create({
      email: 'test@example.com',
      passwordHash: 'testpassword',
      role: 'admin',
    });
  }

  // Fetch the user
  const fetchedUser = await UserModel.findOne({ email: 'test@example.com' });

  return NextResponse.json({
    email: fetchedUser?.email,
    role: fetchedUser?.role,
    id: fetchedUser?._id.toString(),
  });
} 
 