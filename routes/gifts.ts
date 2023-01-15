import { Router } from "express";
import { GiftRecord } from "../records/gift.record";

export const giftsRouter = Router();

giftsRouter

    .get('/', async (req, res) => {
        const allGifts = await GiftRecord.listAll();
        res.render('./gifts/allGifts', {
            gifts: allGifts,
        });
    })

    .post('/', async (req, res) => {
        const data = {
            ...req.body,
            qty: Number(req.body.qty),
        };

        const newGift = new GiftRecord(data);
        await newGift.insert();

        res
            .status(201)
            .redirect('/gifts');
    });



