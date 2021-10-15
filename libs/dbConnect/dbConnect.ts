import mongoose from "mongoose";

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD as string;

if (!MONGODB_PASSWORD) {
    throw new Error(
        "Please define the MONGODB_PASSWORD environment variable inside .env.local"
    );
}

const NODE_ENV = process.env.NODE_ENV as string;

if (!NODE_ENV) {
    throw new Error(
        "Please define the NODE_ENV environment variable inside .env.local"
    );
}

const mongoDbURI = `mongodb+srv://admin:${MONGODB_PASSWORD}@cluster0.27smu.mongodb.net/${NODE_ENV}?retryWrites=true&w=majority`;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongoDbURI).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
