import { ObjectId } from "mongodb";
import { db } from "../db.js";

export async function getUsers() {
    const usersCollection = db.collection("users");

    return await usersCollection.find().toArray();
}

export async function getUserById(id) {
    const usersCollection = db.collection("users");

    return await usersCollection.findOne({
        _id: new ObjectId(id)
    });
}

export async function createUser(user) {
    const usersCollection = db.collection("users");

    return await usersCollection.insertOne(user);
}