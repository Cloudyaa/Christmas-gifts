import {Router} from "express";
import {ChildRecord} from "../records/child.record";
import {GiftRecord} from "../records/gift.record";
import {ValidationError} from "../utils/errors";

export const childsRouter = Router();

childsRouter

    .get('/', async (req, res) => {
        const allChilds = await ChildRecord.listAll();
        const giftsList = await GiftRecord.listAll();
        res.render('./childs/allChilds', {
            children: allChilds,
            gifts: giftsList,
        });
    })

    .post('/', async (req, res) => {
        const newChild = new ChildRecord(req.body);
        await newChild.insert();
        res
            .status(201)
            .redirect('/childs');
    })

    .patch('/gift/:childId', async (req, res) => {
        const child = await ChildRecord.getOne(req.params.childId);

        if(child === null){
            throw new ValidationError('There is no child with given ID');
        }

        const gift = req.body.giftId === ' ' ? null : await GiftRecord.getOne(req.body.giftId);


        if(gift){
           if(gift.qty <= await gift.countGivenGifts()){
               throw new ValidationError('There is not enough of chosen gift');
           }
        }

        // gift === null ? null : gift.id;
        child.giftId = gift?.id ?? null;
        await child.update();
        res
            .status(201)
            .redirect('/childs');
    });



