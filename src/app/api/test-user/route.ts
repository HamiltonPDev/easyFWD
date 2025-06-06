import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import UserModel from '../../../models/User';

export async function GET() {
  await connectDB();

  // Delete the user if it exists
  await UserModel.deleteOne({ email: 'admin@easyfwd.com' });

  // Create a test user if not exists
  let user = await UserModel.findOne({ email: 'admin@easyfwd.com' });
  if (!user) {
    user = await UserModel.create({
      email: 'admin@easyfwd.com',
      passwordHash: 'admin1234',
      role: 'admin',
    });
  }

  // Fetch the user
  const fetchedUser = await UserModel.findOne({ email: 'admin@easyfwd.com' });

  return NextResponse.json({
    email: fetchedUser?.email,
    role: fetchedUser?.role,
    id: fetchedUser?._id.toString(),
  });
} 
 