import NextAuth, { DefaultSession, SessionStrategy, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '../../../../lib/mongodb';
import UserModel from '../../../../models/User';

// This code sets up NextAuth authentication for a Next.js API route using credentials (email and password) and integrates with a MongoDB user model.

// 1. Type Augmentation for NextAuth
// The `declare module 'next-auth'` block extends the default NextAuth types to include a `role` property on both the User and Session objects.
// This allows TypeScript to recognize and type-check the custom `role` field throughout the app.
declare module 'next-auth' {
  interface User {
    role: string; // Add a role property to the User object
  }
  interface Session {
    user: {
      role: string; // Add a role property to the Session's user object
    } & DefaultSession['user']
  }
}

// 2. NextAuth Handler Configuration
export const authOptions = {
  // Providers define how users can sign in. Here, we use a CredentialsProvider for email/password login.
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      // The authorize function is called when a user attempts to sign in.
      async authorize(credentials) {
        // Validate that both email and password are provided.
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        try {
          // Connect to the MongoDB database.
          await connectDB();
          
          // Find the user by email using a static method on the User model.
          const user = await UserModel.findByEmail(credentials.email);
          
          // If no user is found, throw an error.
          if (!user) {
            throw new Error('No user found');
          }
          // Check if the provided password matches the stored password hash.
          const isValid = await user.comparePassword(credentials.password);
          
          if (!isValid) {
            throw new Error('Invalid password');
          }

          // If authentication is successful, return a user object with id, email, and role.
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          // Log and rethrow a generic authentication error.
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  // Use JWT (JSON Web Token) strategy for session management.
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  // Callbacks allow customizing the JWT and session objects.
  callbacks: {
    // The jwt callback is called whenever a JWT is created or updated.
    async jwt({ token, user }: { token: JWT, user: User }) {
      // If a user object is present (i.e., on sign-in), add the user's role to the token.
      if (user) {
        token.role = user.role; 
      }
      return token;
    },
    // The session callback is called whenever a session is checked or created.
    async session({ session, token }: { session: Session, token: JWT}) {
      // Add the role from the token to the session's user object.
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  // Custom sign-in page route.
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

// Export the handler for both GET and POST HTTP methods, as required by Next.js API routes.
export { handler as GET, handler as POST }; 