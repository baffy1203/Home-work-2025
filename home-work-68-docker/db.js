import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_CONNECTION_STRING;

const client = new MongoClient(connectionString);

export let db;

export async function dbConnect() {
    await client.connect();

    db = client.db("test-db-leya");

    console.log("Connected to MongoDB", connectionString);
}