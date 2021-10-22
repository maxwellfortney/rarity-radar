// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect/dbConnect";
import { Collection } from "../../../models/Collection";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let minDate = undefined;
    if (req.query.minDate) {
        minDate = parseFloat(req.query.minDate as string);
    }

    let maxDate = undefined;
    if (req.query.maxDate) {
        maxDate = parseFloat(req.query.maxDate as string);
    }

    await dbConnect();

    let collections;
    if (minDate) {
        collections = await Collection.find(
            { listDate: { $gt: minDate } },
            undefined,
            { sort: { listDate: 1 } }
        );
    } else if (maxDate) {
        collections = await Collection.find(
            { listDate: { $lt: maxDate } },
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
