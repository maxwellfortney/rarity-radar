import mongoose, { Document, model, Model, Schema } from "mongoose";
import { Attribute, IAttribute } from "./Attribute";

export interface INFT extends Document {
    name: string;
    description: string;
    externalURL: string;
    image: string;
    attributes: Array<IAttribute>;
}

const NFTSchema: Schema = new mongoose.Schema({
    name: String,
    description: String,
    externalURL: String,
    image: String,
    attributes: [Attribute],
});

export const NFT: Model<INFT> = mongoose.models.NFT || model("NFT", NFTSchema);
