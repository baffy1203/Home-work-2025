import { db } from "../db.js";
import { ObjectId } from "mongodb";

export async function getMasters() {
    return await db.collection("masters").find().toArray();
}

export async function getMasterById(id) {
    return await db.collection("masters").findOne({
        _id: new ObjectId(id)
    });
}