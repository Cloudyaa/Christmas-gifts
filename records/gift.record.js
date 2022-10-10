import {pool} from "../utils/db.js";
import {ValidationError} from "../utils/errors.js";
import {v4 as uuid} from "uuid";

export class GiftRecord {
    constructor(obj) {
        if(!obj.name || obj.name.length < 3 || obj.name.length > 55){
            throw new ValidationError('Name of gift should be between 3 - 55 characters')
        }
        if(!obj.qty || obj.qty.length < 1 || obj.qty.length > 999999){
            throw new ValidationError('Quantity should be between 1 - 999999')
        }

        this.id = obj.id;
        this.name = obj.name;
        this.qty = obj.qty;
    }

    async insert(){
        if(!this.id){
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `gifts` VALUES(:id, :name, :qty)", {
            id: this.id,
            name: this.name,
            qty: this.qty,
        });

        return this.id;
    }

    static async listAll(){
       const [results] = await pool.execute("SELECT * FROM `gifts`;");
        return results.map(obj => new GiftRecord(obj));

    }

    async countGivenGifts(){
        // answer[0][0].count
        const [[{count}]] = await pool.execute("SELECT COUNT(*) AS `count` FROM `children` WHERE `giftId` = :id",{
            id: this.id,
        });
       // console.log(results)
        return count;
    }

    static async getOne(id){
        const [results] = await pool.execute("SELECT * FROM `gifts` WHERE `id` = :id", {
            id,
        });
        return results.length === 0 ? null : new GiftRecord(results[0]);
    }
}
