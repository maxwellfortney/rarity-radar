import mongoose, { Document, model, Model, Schema } from "mongoose";
import { ITrait, TraitSchema } from "./Trait";

export interface INFT extends Document {
    collectionName: string;
    name: string;
    description: string;
    externalURL?: string;
    image: string;
    blurHash?: string;
    attributes: Array<ITrait>;
    meanPercentage?: number;
    rank?: number;
    rarityScore?: number;
    tokenId?: number;
}

export const NFTSchema: Schema = new mongoose.Schema({
    collectionName: String,
    name: String,
    description: { type: String, required: false },
    externalURL: { type: String, required: false },
    image: String,
    blurHash: { type: String, required: false },
    attributes: [TraitSchema],
    meanPercentage: { type: Number, required: false },
    rank: { type: Number, required: false },
    rarityScore: { type: Number, required: false },
    tokenId: { type: Number, required: false },
});

export const NFT: Model<INFT> = mongoose.models.NFT || model("NFT", NFTSchema);
