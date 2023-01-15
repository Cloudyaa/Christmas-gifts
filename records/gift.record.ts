import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";

type GiftRecordResults = [GiftRecord[], FieldPacket[]];

export class GiftRecord{
    id?: string;
    name: string;
    qty: number;

    constructor(obj: GiftRecord) {
        if(!obj.name || obj.name.length < 3 || obj.name.length > 55){
            throw new ValidationError('Name of gift should be between 3 - 55 characters')
        }
        if(!obj.qty || obj.qty < 1 || obj.qty > 999999){
            throw new ValidationError('Quantity should be between 1 - 999999')
        }

       this.id = obj.id;
       this.name = obj.name;
       this.qty = obj.qty;
    }

    async insert(): Promise<string>{
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

    static async listAll(): Promise<GiftRecord[]>{
       const [results] = await pool.execute("SELECT * FROM `gifts`;") as GiftRecordResults;
        return results.map(obj => new GiftRecord(obj));
    }

    async countGivenGifts(): Promise<number>{
        // answer[0][0].count
        const [[{qty}]] = await pool.execute("SELECT COUNT(*) AS `qty` FROM `children` WHERE `giftId` = :id",{
            id: this.id,
        }) as GiftRecordResults;
        return qty;
    }

    static async getOne(id: string): Promise<GiftRecord> | null{
        const [results] = await pool.execute("SELECT * FROM `gifts` WHERE `id` = :id", {
            id,
        }) as GiftRecordResults;
        return results.length === 0 ? null : new GiftRecord(results[0]);
    }

}
