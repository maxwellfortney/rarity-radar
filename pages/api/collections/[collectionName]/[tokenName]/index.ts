// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../libs/dbConnect/dbConnect";
import { NFT } from "../../../../../models/NFT";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const collectionName = req.query.collectionName as string;
    const tokenName = req.query.tokenName as string;

    console.log(collectionName);
    console.log(tokenName);

    await dbConnect();

    const nft = await NFT.findOne({ collectionName, name: tokenName });

    if (nft) {
        res.status(200).json(JSON.stringify(nft, undefined, 4));
    } else {
        res.status(404).json(
            JSON.stringify(
                { error: "true", message: "Failed to find nft" },
                undefined,
                4
            )
        );
    }
}
