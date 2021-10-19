// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const questions = req.query.questions as string[];
    const answers = req.query.answers as string[];

    console.log(req.query);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nftrarityradarmailer@gmail.com",
            pass: process.env.NEXT_PUBLIC_GMAIL_PASSWORD,
        },
        secure: true,
    });

    let html = "";

    questions.forEach((question, i) => {
        html += `<div>${question} : ${answers[i]}</div>`;
    });

    const mailData = {
        from: "NFTRarityRadarMailer@gmail.com",
        to: "NFTRarityRadar@gmail.com",
        subject: `New Request To Get Listed`,
        html,
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, function (err, info) {
            if (err) {
                console.log(err);
                resolve(res.status(404).json({ error: true, message: err }));
            } else {
                console.log(info);
                resolve(
                    res.status(200).json({
                        error: false,
                        message: "Sent request to get listed",
                    })
                );
            }
        });
    });
}
