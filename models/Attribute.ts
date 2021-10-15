import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IAttribute extends Document {
    traitType: string;
    value: string;
}

const AttributeSchema: Schema = new mongoose.Schema({
    traitType: String,
    value: String,
});

export const Attribute: Model<IAttribute> =
    mongoose.models.Attribute || model("Attribute", AttributeSchema);
