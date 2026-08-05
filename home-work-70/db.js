import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_CONNECTION_STRING;

export async function dbConnect() {
    await mongoose.connect(connectionString);

    console.log("MongoDB Connected!");
}