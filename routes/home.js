import { Router } from "express";
import {ChildRecord} from "../records/child.record.js";
import {GiftRecord} from "../records/gift.record.js";

export const homeRouter = Router();

homeRouter

    .get('/', async (req, res) => {
        const allChilds = await ChildRecord.listAll();
        const giftsList = await GiftRecord.listAll();
        res.render('./index.hbs', {
            children: allChilds.length,
            gifts: giftsList.length,
        })
    })

