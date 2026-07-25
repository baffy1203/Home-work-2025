import dotenv from "dotenv";
import app from "./app.js";
import { dbConnect } from "./db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function connect() {
    try {
        await dbConnect();

        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error connection with Database", error);
    }
}

connect();