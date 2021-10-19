// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../libs/dbConnect/dbConnect";
import { Collection } from "../../../../models/Collection";
import { NFT } from "../../../../models/NFT";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const collectionName = req.query.collectionName as string;

    await dbConnect();

    const collection = await Collection.findOne({ name: collectionName });

    if (collection) {
        res.status(200).json(JSON.stringify(collection, undefined, 4));
        return;
    } else {
        res.status(404).json({
            error: true,
            message: "Failed to find collection with collectionName:",
            collectionName,
        });
        return;
    }
}
