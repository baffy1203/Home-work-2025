import { db } from "../db.js";
import { ObjectId } from "mongodb";

export async function getMasters() {
    const mastersCollection = db.collection("masters");
    return await mastersCollection.find({}).toArray();
}

export async function getMasterById(id) {
    const mastersCollection = db.collection("masters");

    return await mastersCollection.findOne({
        _id: new ObjectId(id)
    });
}

export async function createMaster(newMaster) {
    const mastersCollection = db.collection("masters");

    let result = await mastersCollection.insertOne(newMaster);

    if (result.acknowledged) {
        result = await mastersCollection.findOne({
            _id: result.insertedId
        });
    } else {
        result = { success: false };
    }

    return result;
}

export async function createManyMasters(masters) {
    const mastersCollection = db.collection("masters");

    return await mastersCollection.insertMany(masters);
}

export async function updateMaster(id, updateData) {
    const mastersCollection = db.collection("masters");

    return await mastersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );
}

export async function updateManyMasters(filter, updateData) {
    const mastersCollection = db.collection("masters");

    return await mastersCollection.updateMany(
        filter,
        { $set: updateData }
    );
}

export async function replaceMaster(id, newMaster) {
    const mastersCollection = db.collection("masters");

    return await mastersCollection.replaceOne(
        { _id: new ObjectId(id) },
        newMaster
    );
}

export async function deleteMaster(id) {
    const mastersCollection = db.collection("masters");

    return await mastersCollection.deleteOne({
        _id: new ObjectId(id)
    });
}

export async function deleteManyMasters(filter) {
    const mastersCollection = db.collection("masters");

    return await mastersCollection.deleteMany(filter);
}

export async function findMasters(filter = {}, projection = {}) {
    const mastersCollection = db.collection("masters");

    return await mastersCollection.find(filter, {
        projection
    }).toArray();
}
export async function getMastersWithPagination(page = 1, perPage = 10) {
    const mastersCollection = db.collection("masters");

    const totalCount = await mastersCollection.countDocuments();

    const skip = (page - 1) * perPage;

    const data = await mastersCollection
        .find({})
        .sort({ name: 1 })
        .skip(skip)
        .limit(perPage)
        .toArray();

    return {
        totalCount,
        data
    };
}
export async function getMastersStatistics() {
    const mastersCollection = db.collection("masters");

    return await mastersCollection.aggregate([
        {
            $group: {
                _id: "$specialization",
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ]).toArray();
}