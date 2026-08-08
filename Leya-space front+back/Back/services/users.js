import User from "../models/User.js";

export async function getUsers() {
    return await User.find();
}

export async function getUserById(id) {
    return await User.findById(id);
}

export async function createUser(user) {
    return await User.create(user);
}

export async function updateUser(id, data) {
    return await User.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
        }
    );
}