import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);

        console.log("MongoDB Connected!");

        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error connection with Database", error);
    }
}

connect();