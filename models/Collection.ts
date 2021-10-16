import mongoose, { Document, model, Model, Schema } from "mongoose";
import { INFT, NFTSchema } from "./NFT";
import { ITrait, TraitSchema } from "./Trait";

export interface ICollection extends Document {
    name: string;
    externalURL: string;
    // traits: Array<ITrait>;
    // NFTs: Array<INFT>;
}

export const CollectionSchema: Schema = new mongoose.Schema({
    name: String,
    externalURL: String,
    // traits: [TraitSchema],
    // NFTs: [NFTSchema],
});

export const Collection: Model<ICollection> =
    mongoose.models.Collection || model("Collection", CollectionSchema);
