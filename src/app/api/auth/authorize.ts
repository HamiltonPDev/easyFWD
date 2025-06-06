import { connectDB } from "../../../lib/mongodb";
import UserModel from "../../../models/User";

export async function authorize(credentials: { email: string, password: string }) {
    // Validate that both email and password are provided
    if (!credentials?.email || !credentials?.password) throw new Error('Missing credentials');

    // Connect to the MongoDB database
    await connectDB();

    // Find the user by email using a static method on the User model
    const user = await UserModel.findByEmail(credentials.email);

    // If no user is found, throw an error
    if (!user) throw new Error('No user found');

    // Invalid email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) throw new Error('Invalid email format');

    // Invalid password format
    if (!credentials.password || credentials.password.length < 8) throw new Error('Invalid password');

    // Check if the provided password matches the stored password hash
    const isValid = await user.comparePassword(credentials.password);

    // If the password is invalid, throw an error
    if (!isValid) throw new Error('Incorrect password');

    // If authentication is successful, return a user object with id, email, and role
    return {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    };
}