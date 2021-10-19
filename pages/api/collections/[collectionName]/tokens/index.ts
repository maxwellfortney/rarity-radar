// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../libs/dbConnect/dbConnect";
import { NFT } from "../../../../../models/NFT";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const collectionName = req.query.collectionName as string;
    const page = parseInt(req.query.page as string) || 0;
    const perPage = parseInt(req.query.perPage as string) || 25;
    const idFilter = (req.query.idFilter as string) || "";
    const sort = (req.query.sort as string) || "rank";

    await dbConnect();

    console.log(parseSortString(sort));

    let nfts = [];
    if (idFilter.length > 0) {
        nfts = await NFT.find(
            {
                collectionName: { $regex: collectionName, $options: "i" },
                name: { $regex: idFilter, $options: "i" },
            },
            undefined,
            { sort: parseSortString(sort), limit: perPage }
        );
    } else {
        nfts = await NFT.find(
            {
                collectionName: { $regex: collectionName, $options: "i" },
            },
            undefined,
            {
                limit: perPage,
                skip: page * perPage,
                sort: parseSortString(sort),
            }
        );
    }

    if (nfts) {
        res.status(200).json(JSON.stringify(nfts, undefined, 4));
        return;
    } else {
        res.status(404).json({
            error: true,
            message: "Failed to find nfts with collectionName:",
            collectionName,
        });
        return;
    }
}

function parseSortString(sort: string) {
    let isNegative = sort.substr(0, 1) === "-";

    let ret: any = {};

    if (isNegative) {
        ret[sort.substr(1)] = -1;
    } else {
        ret[sort.substr(0)] = 1;
    }

    return ret;
}
