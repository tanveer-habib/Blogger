import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
let cached = global.mongoDB;
if (!cached) {
    cached = global.mongoDB = { conn: null, promise: null };
}

const connectDB = async () => {
    try {
        if (cached.conn) return cached.conn;
        if (!cached.promise) cached.promise = mongoose.connect(uri)

        cached.conn = await cached.promise;
        console.log("DB connected");
        return cached.conn;
    } catch (error) {
        console.log("DB connection error : ", error.message);
    };
};

export default connectDB;