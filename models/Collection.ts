import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface ICollection extends Document {
    name: string;
    websiteURL?: string;
    discordURL?: string;
    twitterURL?: string;
    totalSupply?: number;
    highestMeanPercentage?: number;
    lowestMeanPercentage?: number;
    listDate?: number;
    mintPrice?: number;
    previewImages?: Array<string>;
    highestRarityScore?: number;
    lowestRarityScore?: number;
    contractAddress?: string;
}

export const CollectionSchema: Schema = new mongoose.Schema({
    name: String,
    websiteURL: { type: String, required: false },
    discordURL: { type: String, required: false },
    twitterURL: { type: String, required: false },
    totalSupply: { type: Number, required: false },
    highestMeanPercentage: { type: Number, required: false },
    lowestMeanPercentage: { type: Number, required: false },
    listDate: { type: Number, required: false },
    mintPrice: { type: Number, required: false },
    previewImages: { type: [String], required: false },
    highestRarityScore: { type: Number, required: false },
    lowestRarityScore: { type: Number, required: false },
    contractAddress: { type: String, required: false },
});

export const Collection: Model<ICollection> =
    mongoose.models.Collection || model("Collection", CollectionSchema);
