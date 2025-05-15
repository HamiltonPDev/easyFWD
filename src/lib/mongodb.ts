import mongoose from 'mongoose';

// This type will help us cache the connection and the promise for connecting
type MongooseCache = {
  conn: typeof mongoose | null; // The actual mongoose connection, or null if not connected yet
  promise: Promise<typeof mongoose> | null; // The promise for the connection, or null if not started yet
};

// This makes sure TypeScript knows about our global "mongoose" variable for caching
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

// Make sure the MongoDB connection string is set in the environment variables
if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const MONGODB_URI = process.env.MONGODB_URI;

// We use a global variable to store the connection across hot reloads in development
let cached: MongooseCache = global.mongoose;

// If the cache doesn't exist yet, create it
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB using mongoose.
 * This function will reuse the existing connection if possible,
 * or create a new one if needed.
 */
export async function connectDB(): Promise<typeof mongoose> {
  // If we already have a connection, just return it
  if (cached.conn) {
    return cached.conn;
  }

  // If we don't have a promise for a connection, start connecting
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering, recommended for serverless
    };

    // Start connecting and store the promise
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    // Wait for the connection to finish and store it
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, reset the promise so we can try again later
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;