import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface ITrait extends Document {
    collectionName?: string;
    traitType: string;
    value: string;
    percentage?: number;
    score?: number;
}

export const TraitSchema: Schema = new mongoose.Schema({
    collectionName: { type: String, required: false },
    traitType: String,
    value: String,
    percentage: { type: Number, required: false },
    score: { type: Number, required: false },
});

export const Trait: Model<ITrait> =
    mongoose.models.Trait || model("Trait", TraitSchema);
