import mongoose, { Document, model, Model, Schema } from "mongoose";
import { INFT, NFT } from "./NFT";

export interface ICollection extends Document {
    name: string;
    externalURL: string;
    NFTs: Array<INFT>;
}

const CollectionSchema: Schema = new mongoose.Schema({
    name: String,
    externalURL: String,
    NFTs: [NFT],
});

export const Collection: Model<ICollection> =
    mongoose.models.Collection || model("Collection", CollectionSchema);
