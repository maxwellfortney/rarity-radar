import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface ICollection extends Document {
    name: string;
    externalURL: string;
    discordURL?: string;
    twitterURL?: string;
    totalSupply: number;
    highestMeanPercentage: number;
    lowestMeanPercentage: number;
    listDate?: number;
    mintPrice?: number;
}

export const CollectionSchema: Schema = new mongoose.Schema({
    name: String,
    externalURL: String,
    discordURL: { type: String, required: false },
    twitterURL: { type: String, required: false },
    totalSupply: Number,
    highestMeanPercentage: Number,
    lowestMeanPercentage: Number,
    listDate: { type: Number, required: false },
    mintPrice: { type: Number, required: false },
});

export const Collection: Model<ICollection> =
    mongoose.models.Collection || model("Collection", CollectionSchema);
