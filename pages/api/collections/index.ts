// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect/dbConnect";
import { Collection } from "../../../models/Collection";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();

    const collections = await Collection.find({});

    console.log(collections);

    if (collections) {
        res.status(200).json(collections);
        return;
    } else {
        res.status(404);
        return;
    }
}
