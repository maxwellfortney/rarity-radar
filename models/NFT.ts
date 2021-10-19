import mongoose, { Document, model, Model, Schema } from "mongoose";
import { ITrait, TraitSchema } from "./Trait";

export interface INFT extends Document {
    collectionName: string;
    name: string;
    description: string;
    websiteURL: string;
    image: string;
    attributes: Array<ITrait>;
    meanPercentage: number;
    rank: number;
}

export const NFTSchema: Schema = new mongoose.Schema({
    collectionName: String,
    name: String,
    description: String,
    websiteURL: String,
    image: String,
    attributes: [TraitSchema],
    meanPercentage: Number,
    rank: Number,
});

export const NFT: Model<INFT> = mongoose.models.NFT || model("NFT", NFTSchema);
