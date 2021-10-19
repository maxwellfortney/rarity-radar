// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../libs/dbConnect/dbConnect";
import { Collection } from "../../../../models/Collection";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { name } = req.query;

    await dbConnect();

    // @ts-expect-error
    const collections = await Collection.find({
        name: { $regex: name, $options: "i" },
    });

    if (collections) {
        res.status(200).json(JSON.stringify(collections, undefined, 4));
        return;
    } else {
        res.status(404);
        return;
    }
}
