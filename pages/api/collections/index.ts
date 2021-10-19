// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect/dbConnect";
import { Collection } from "../../../models/Collection";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const minDate = parseFloat(req.query.minDate as string) || null;

    await dbConnect();

    let collections;
    if (minDate) {
        collections = await Collection.find(
            { listDate: { $gt: minDate } },
            undefined,
            { sort: { listDate: 1 } }
        );
    } else {
        collections = await Collection.find({});
    }

    console.log(collections);

    if (collections) {
        res.status(200).json(JSON.stringify(collections, undefined, 4));
        return;
    } else {
        res.status(404);
        return;
    }
}
