import Master from "../models/Master.js";

export async function getMasters() {
    return await Master.find();
}

export async function getMasterById(id) {
    return await Master.findById(id);
}

export async function createMaster(newMaster) {
    return await Master.create(newMaster);
}

export async function createManyMasters(masters) {
    return await Master.insertMany(masters);
}

export async function updateMaster(id, updateData) {
    return await Master.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    );
}

export async function updateManyMasters(filter, updateData) {
    return await Master.updateMany(
        filter,
        { $set: updateData }
    );
}

export async function replaceMaster(id, newMaster) {
    return await Master.findOneAndReplace(
        { _id: id },
        newMaster,
        { new: true }
    );
}

export async function deleteMaster(id) {
    return await Master.findByIdAndDelete(id);
}

export async function deleteManyMasters(filter) {
    return await Master.deleteMany(filter);
}

export async function findMasters(filter = {}, projection = {}) {
    return await Master.find(filter, projection);
}

export async function getMastersWithPagination(page = 1, perPage = 10) {
    const totalCount = await Master.countDocuments();

    const skip = (page - 1) * perPage;

    const data = await Master.find()
        .sort({ name: 1 })
        .skip(skip)
        .limit(perPage);

    return {
        totalCount,
        data
    };
}

export async function getMastersStatistics() {
    return await Master.aggregate([
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
    ]);
}