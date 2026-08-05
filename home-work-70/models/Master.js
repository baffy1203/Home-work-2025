import mongoose from "mongoose";

const masterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        specialization: {
            type: String,
            required: true,
            trim: true,
        },
        experience: {
            type: Number,
            required: true,
            min: 0,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        collection: "masters",
        timestamps: true,
    }
);

export default mongoose.model("Master", masterSchema);