// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../libs/dbConnect/dbConnect";
import { Collection } from "../../../../models/Collection";
import { NFT } from "../../../../models/NFT";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const name = req.query.name as string;
    const page = parseInt(req.query.page as string) || 0;
    const perPage = parseInt(req.query.perPage as string) || 25;
    const idFilter = (req.query.idFilter as string) || "";

    await dbConnect();

    let nfts = [];
    if (idFilter.length > 0) {
        nfts = await NFT.find(
            {
                collectionName: { $regex: name, $options: "i" },
                name: { $regex: idFilter, $options: "i" },
            },
            undefined,
            { sort: { rank: 1 } }
        );
    } else {
        nfts = await NFT.find(
            {
                collectionName: { $regex: name, $options: "i" },
            },
            undefined,
            { limit: perPage, skip: page * perPage, sort: { rank: 1 } }
        );
    }

    if (nfts) {
        res.status(200).json(JSON.stringify(nfts, undefined, 4));
        return;
    } else {
        res.status(404).json({
            error: true,
            message: "Failed to find nfts with name:",
            name,
        });
        return;
    }
}
